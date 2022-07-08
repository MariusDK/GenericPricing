import fs from 'fs';
import { DatabaseConnection } from '../database/connection';
import CourseRequest from '../models/courseRequest';
import moment from 'moment';
import { MysqlError } from 'mysql';

export default class CourseRepository {

    constructor() {}

    static getRangeOfRows = async (courseRequest: CourseRequest): Promise<Course> => {
        const poolInstance = DatabaseConnection.getPoolInstance();

        const query = this.courseQueryBuilder(courseRequest);

        await poolInstance.query(query, (err: any, rows: Course[]) => {
            if(err) {
                console.error(err);
                return;
            }
            if (rows.length == 0) {
                return ;
            } else {
               return rows[0]; 
            }
        });
        return new Course();
    }

    private static courseQueryBuilder = (courseRequest: CourseRequest) : string => {
        let finalQuery = 'SELECT * FROM course_pricing AS gcp'
        let whereClause = ' WHERE'
        let conditionalQuery = '';

        if (courseRequest.coursePackage && (typeof courseRequest.coursePackage === 'string')) {
            conditionalQuery += ` gcp.resort = ${courseRequest.coursePackage}`;
        }

        if (courseRequest.course && (typeof courseRequest.course === 'string')) {
            conditionalQuery += ` AND gcp.course = ${courseRequest.course}`
        }

        if (courseRequest.datetime && (typeof courseRequest.datetime === 'string')) {
            conditionalQuery += ` AND STR_TO_DATE(${courseRequest.datetime}, '%Y-%m-%d') between STR_TO_DATE(gcp.start_date, '%m/%d/%Y') AND STR_TO_DATE(gcp.end_date, '%m/%d/%Y')`;
            const date = courseRequest.datetime.split(' ')[0] + ' ';
            conditionalQuery += ` STR_TO_DATE(${courseRequest.datetime}, '%Y-%m-%d %H:%i') between STR_TO_DATE(CONCAT(${date}, gcp.start_time), '%Y-%m-%d %h:%i %p') AND STR_TO_DATE(CONCAT(${date}, gcp.end_time), '%Y-%m-%d %h:%i %p')`;
        }

        if (courseRequest.replayCourse && (typeof courseRequest.replayCourse === 'string')) {
            conditionalQuery += ` AND gcp.replay_course = ${courseRequest.replayCourse}`;
        }

        if (courseRequest.secondRoundDate && (typeof courseRequest.secondRoundDate === 'string')) {
            // Test this for calls or do two
            conditionalQuery += ` AND gcp.is_two_rounds = (SELECT MAX(is_two_rounds) FROM course_pricing WHERE number_of_golfers <= 0 AND ${conditionalQuery})`;
        }
    
        if (courseRequest.numberGolfers) {
            conditionalQuery += ` AND gcp.number_of_golfers = (SELECT MAX(number_of_golfers) FROM course_pricing WHERE number_of_golfers <= ${courseRequest.numberGolfers} AND ${conditionalQuery})`;
        }

        // momentjs get days between to dates

        //use moment for know

        let bookingToday = moment().startOf("day").hours(0).minutes(0).seconds(0).milliseconds(0);
        let bookingDate = moment(courseRequest.datetime).startOf("day").hours(0).minutes(0).seconds(0).milliseconds(0);
        var bookingLimit = bookingDate.diff(bookingToday, 'days'); 
        
        conditionalQuery += ` AND booking_limit = (SELECT MAX(booking_limit) FROM course_pricing WHERE booking_limit < ${bookingLimit} AND ${conditionalQuery})`;

        return `${finalQuery}${whereClause}${conditionalQuery}`;
    }

    static upload = async (courses: Course[]) : Promise<string> => {
        let message: string = 'Operation not executed!';
        const poolInstance = DatabaseConnection.getPoolInstance();
        //TODO new db table with less columns
        let query = 'INSERT INTO course_pricing (resort, golf_course, cost, start_date, end_date, replay_rules,'
            + ' tax, additional_tax, fee, start_time, end_time, is_two_rounds, number_of_golfers, markup, booking_limit, total) VALUES';
        courses.forEach(course => {
            query +=`${course.toString},`;
        });
        query.replace(/.$/,';');
        await poolInstance.query(query, (err: MysqlError) => {
            if(err) {
                return err.message;
            } else {
                message = 'Upload golf courses succesfully!';
            }
        });

        return message;
    }
    
    static remove = async (columnName: string, columnValue: string): Promise<string> => {
        let message: string = 'Operation not executed!';
        const poolInstance = DatabaseConnection.getPoolInstance();
        await poolInstance.query(`DELETE FROM course_pricing WHERE ${columnName} = '${columnValue}'`, (err: MysqlError) => {
            if (err) {
                return err.message;
            } else {
                message = 'Remove rows succesfully';
            }
        })
        return message;
    };

    static enableMigration = (golfChangedFile: string): string => {
        fs.writeFileSync('./golf-courses-migration-pricing.json', JSON.stringify(golfChangedFile));
        return 'Golf file written successfully!';
    }
    
    static getEnableMigration = (): any => {
        let golfMigrationData = fs.readFileSync('./golf-courses-migration-pricing.json');
        return JSON.parse(golfMigrationData.toString());
    }
}
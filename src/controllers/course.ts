import { Request, Response } from 'express';
import CourseRequest from '../models/courseRequest';
import CourseRepository from '../repository/course';
import XLSXParser from '../xlsx/xlsxParser';

// FIXME add log management tool

export default class CourseController {

    static getPrice = (req: Request, res: Response) => {
        const coursePackage = req.query.resort as string;
        const course = req.query.course as string;
        const replayCourse = req.query.replayCourse as string | undefined;
        const numberGolfers = parseInt(req.query.nrGolfers as string);
        const datetime = req.query.date as string;
        const secondRoundDate = req.query.secondRoundDate as string | undefined;

        const courseRequest = new CourseRequest(coursePackage, course, replayCourse, numberGolfers, datetime, secondRoundDate);

        CourseRepository.getRangeOfRows(courseRequest)
                            .then((course: Course) => res.send(course))
    }

    static upload = (req: Request, res: Response) => {
        const courses: Course[] = XLSXParser.toJson(req.file?.buffer);
        CourseRepository.upload(courses).then(status => {
            res.send(status);
        });

    }

    static remove = (req: Request, res: Response) => {
        CourseRepository.remove(req.query.column as string, req.query.columnValue as string).then(status => {
            res.send(status);
        });
    }

    static enableMigration = (req:Request, res: Response) => {
        res.send(CourseRepository.enableMigration(req.body));
    }
    
    static getEnableMigration = (req: Request, res: Response) => {
        res.send(CourseRepository.getEnableMigration());
    }
}


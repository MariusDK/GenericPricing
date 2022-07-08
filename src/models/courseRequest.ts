export default class CourseRequest {
    readonly coursePackage : string;
    
    readonly course : string;

    readonly replayCourse : string | undefined;

    readonly numberGolfers : number;

    readonly datetime : string;

    readonly secondRoundDate : string | undefined;

    constructor(coursePackage: string, course: string, replayCourse: string | undefined, numberGolfers: number, datetime: string, secondRoundDate: string | undefined) {
        this.coursePackage = coursePackage;
        this.course = course;
        this.replayCourse = replayCourse;
        this.numberGolfers = numberGolfers;
        this.datetime = datetime;
        this.secondRoundDate = secondRoundDate;
    }
}
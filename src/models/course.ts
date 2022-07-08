class Course {

    private id?: string;

    private coursePackage?: string;
 
    private course?: string;

    private cost?: string;
    
    private startDate?: string;

    private endDate?: string;

    private replayRules?: string;
 
    private tax?: string;
    
    private additionalTax?: string;
   
    private fee?: string;
   
    private startTime?: string;
    
    private endTime?: string;
    
    private isTwoRounds?: string;
    
    private numberOfGolfers?: string;
    
    private markup?: string;
    
    private bookingLimit?: string;
    
    private total?: string;

    constructor()
    constructor(
        id?: string,
        coursePackage?: string, 
        course?: string,
        cost?: string,
        startDate?: string,
        endDate?: string,
        replayRules?: string,
        tax?: string,
        additionalTax?: string,
        fee?: string,
        startTime?: string,
        endTime?: string,
        isTwoRounds?: string,
        numberOfGolfers?: string,
        markup?: string,
        bookingLimit?: string,
        total?: string
        ){
            this.id = id,
            this.coursePackage = coursePackage, 
            this.course = course,
            this.cost = cost,
            this.startDate = startDate,
            this.endDate = endDate,
            this.replayRules = replayRules,
            this.tax = tax,
            this.additionalTax = additionalTax,
            this.fee = fee,
            this.startTime = startTime,
            this.endTime = endTime,
            this.isTwoRounds = isTwoRounds,
            this.numberOfGolfers = numberOfGolfers,
            this.markup = markup,
            this.bookingLimit = bookingLimit,
            this.total = total
    }
    
    toString = () : string => {
        return `(${this.coursePackage}, ${this.course}, ${this.cost}, ${this.startDate}, ${this.endDate}, ${this.replayRules},` 
            + `${this.tax}, ${this.additionalTax}, ${this.fee}, ${this.startTime}, ${this.endTime}, ${this.isTwoRounds},`
            + `${this.numberOfGolfers}, ${this.markup}, ${this.bookingLimit}, ${this.total})`;
    }
}
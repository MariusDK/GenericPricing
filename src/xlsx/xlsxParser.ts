import XLSX from 'xlsx';

export default class XLSXParser {
    static toJson = (file: any) : Course[] => {
        var workbook = XLSX.read(file, {type: 'buffer'});
        const [firstSheetName] = workbook.SheetNames;
        const worksheet = workbook.Sheets[firstSheetName];
        const rows: Course[] = XLSX.utils.sheet_to_json(worksheet, {
            raw: true,
            header: 1
        });
        return rows;
    }
}
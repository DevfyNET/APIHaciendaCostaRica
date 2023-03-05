export class General {

    public isNumber(val: string | number) : boolean {
        return !isNaN(Number(val));
    }
}
export default General;

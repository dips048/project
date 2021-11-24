export class PropertyLoansModel {
  constructor(
    public Loanid: number,
    public LoanAmount: number,
    public IntrestRate: string,
    public LeaseIndicator: boolean,
    public NoteDate: string,
    public DueDate: string,
    public name: string,
    public city: string,
    public yearBuilt: number,
  ) {}
}

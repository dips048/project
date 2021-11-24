export interface Property {
    Loanid?: number,
    name: string;
    city: string;
    yearBuilt: number;
}

export interface PaymentTerm {
    IndexTermType: string;
}

export interface Loan {
    Loanid: number;
    LoanAmount: number;
    IntrestRate: string;
    LeaseIndicator: boolean;
    NoteDate: string;
    DueDate: string;
    Properties: Property[];
    PaymentTerms: PaymentTerm[];
}

export interface DealsModel {
    Loans: Loan[];
}



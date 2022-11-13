export interface CompanyInfoAddress {
  line: string;
  zipcode: string;
  city: string;
}

export interface CompanyInfo {
  name: string;
  website: string;
  email: string;
  KvK: string;
  BTW: string;
  BTWID: string;
  address: CompanyInfoAddress;
}

export const companyInfo: CompanyInfo = {
  name: 'Front Crafter',
  address: {
    line: 'Herengracht 81',
    zipcode: '2312 LC',
    city: 'Leiden',
  },
  website: 'http://www.front-crafter.nl',
  email: 'info@front-crafter.nl',
  KvK: '59822376',
  BTW: 'NL162274944B01',
  BTWID: 'NL001859908B94',
};

export interface BankInfo {
  name: string;
  IBAN: string;
}

export const bankInfo: BankInfo = {
  name: 'ING',
  IBAN: 'NL33 INGB 0006 3168 42',
};

import { ApiObjectDto, ApiObjectAddressDto, ApiObjectCompanyDto } from './api-objects.dto';

export class ApiObject {
    public id: number;
    public name: string;
    public username: string;
    public email: string;
    public address: ApiObjectAddressDto;
    public phone: string;
    public website: string;
    public company: ApiObjectCompanyDto;

    public constructor (row: Record<string, unknown>) {
        this.id = row['id'] as number;
        this.name = row['name'] as string;
        this.username = row['username'] as string;
        this.email = row['email'] as string;
        this.address = row ['address'] as ApiObjectAddressDto;
        this.phone = row['phone'] as string;
        this.website = row['website'] as string;
        this.company = row['company'] as ApiObjectCompanyDto;
    }
}

export class UserBriefSummary {
    public id: number;
    public fullName: string;
    public emailDomain: string;
    public city: string;
    public company: string;
    public coords: { lat: number; lng: number };
    public hasPhoneExt: boolean;
    public zipcodeDigits: number;
    public summary: string;

    public constructor(src: ApiObjectDto) {
        this.id = src.id;
        this.fullName = src.name;
        this.city = src.address.city;
        this.company = src.company.name;
        this.emailDomain = src.email.split('@')[1] ?? '';
        this.coords = {
            lat: Number(src.address.geo.lat),
            lng: Number(src.address.geo.lng)
        };
        this.hasPhoneExt = /x\d+/i.test(src.phone);
        const digits = src.address.zipcode.replace(/\D/g, '');
        this.zipcodeDigits = digits ? Number(digits) : NaN;
        this.summary = `${this.fullName} (@${src.username}) — ${this.city}, ${this.company}`;
    }
}

export class CreateParticipantDto {
  readonly fullName: string;
  readonly email: string;
  dateOfBirth: Date;
  selectedOption: string;
}

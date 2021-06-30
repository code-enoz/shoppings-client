export class SuccessfulLoginServerResponse{
    public constructor(
        public userType: string,
        public authToken: string,
        public userStreet: string
    ){}
}
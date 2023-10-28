export type ProfileResponse = {
    accountId: number,
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    birthdate: Date,
    gender: string,    
    profilePictureUrl?: string,
    coverPhotoUrl?: string,
    bio?: string,
    location?: string,
    website?: string,
    status: string
}
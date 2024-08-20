export class UserDTO {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.email = user.email;
        this.rol = user.rol;
        this.last_connection = user.last_connection;
        this.documents = user.documents;
    }
}

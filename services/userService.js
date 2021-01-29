function userService() {

    //Load User List from Server
    this.getUserListFromServer = function () {
        return axios({
            url: "https://6006de013698a80017de2207.mockapi.io/api/NguoiDung",
            method: "GET",
        });
    }

    //Add New User to Server
    this.addNewUser = function (user) {
        return axios({
            url: "https://6006de013698a80017de2207.mockapi.io/api/NguoiDung",
            method: "POST",
            data: user,
        });
    }

    //delete User
    this.deleteUser = function (id) {
        return axios({
            url: `https://6006de013698a80017de2207.mockapi.io/api/NguoiDung/${id}`,
            method: "DELETE",

        });
    }

    //delete User
    this.getUserbyId = function (id) {
        return axios({
            url: `https://6006de013698a80017de2207.mockapi.io/api/NguoiDung/${id}`,
            method: "GET",
        });
    }

    //delete User
    this.updateUserbyId = function (id, user) {
        return axios({
            url: `https://6006de013698a80017de2207.mockapi.io/api/NguoiDung/${id}`,
            method: "PUT",
            data: user,
        });
    }

}


function getEle(id) {
    return document.getElementById(id);
}

var userService = new userService();
var isLoading = false;

function checkLoading(isLoading) {
    if (isLoading) {
        getEle('loader').style.display = "block";

    } else {
        getEle('loader').style.display = "none";
    }
}

//Load User List from Server
function getUserListfromServer() {
    checkLoading(true);
    userService.getUserListFromServer()
        .then(function (result) {
            console.log(result.data);
            renderList(result.data);
            checkLoading(false);
        })
        .catch(function (err) {
            console.log(err);
        })
}
getUserListfromServer();

//Onclick Them Moi Button // Open Modal
getEle('btnThemNguoiDung').addEventListener("click", function () {
    document.getElementsByClassName('modal-title')[0].innerHTML = "Add User";
    var btnAdduser = `<button onclick="addBtn()" class="btn btn-success">Add</button> `;
    document.getElementsByClassName('modal-footer')[0].innerHTML = btnAdduser;
})

//Button to get Input from user
function addBtn() {
    var newUser = getNewUser();
    addNewUser(newUser);
    document.getElementsByClassName('close')[0].click();
}

//Get New User from Input
function getNewUser() {
    var _hoTen = getEle('HoTen').value;
    var _matKhau = getEle('MatKhau').value;
    var _email = getEle('Email').value;
    var _soDT = getEle('SoDienThoai').value;
    var _maLoaiNguoiDung = getEle('loaiNguoiDung').value;
    var _taiKhoan = getEle('TaiKhoan').value;

    var newUser = new user(
        _hoTen,
        _matKhau,
        _email,
        _soDT,
        _maLoaiNguoiDung,
        _taiKhoan
    );
    return newUser;

}

//Add new User
function addNewUser(user) {
    checkLoading(true);
    userService.addNewUser(user)
        .then(function (result) {
            // console.log(result.data);
            getUserListfromServer();
            checkLoading(false);
        })
        .catch(function (err) {
            console.log(err);
        })
}


//Delete User
function deleteUser(id) {
    checkLoading(true);
    userService.deleteUser(id)
        .then(function (result) {
            // console.log(result.data);
            getUserListfromServer()
            checkLoading(false);
        })
        .catch(function (err) {
            console.log(err);
        })
}

//Onclick Edit Button // Open Modal
function openEditBtn(id) {
    document.getElementsByClassName('modal-title')[0].innerHTML = "Edit User";
    var btnAdduser = `<button onclick="updateBtn(${id})" class="btn btn-info">Update</button> `;
    document.getElementsByClassName('modal-footer')[0].innerHTML = btnAdduser;
    //Get User by ID to output Modal
    userService.getUserbyId(id)
        .then(function (result) {
            console.log(result.data);
            getEle('HoTen').value = result.data.hoTen;
            getEle('MatKhau').value = result.data.matKhau;
            getEle('Email').value = result.data.email;
            getEle('SoDienThoai').value = result.data.soDT;
            getEle('loaiNguoiDung').value = result.data.maLoaiNguoiDung;
            getEle('TaiKhoan').value = result.data.taiKhoan;
        })
        .catch(function (err) {
            console.log(err);
        })
}

function updateBtn(id) {
    checkLoading(true);
    var editUser = getNewUser();
    userService.updateUserbyId(id, editUser)
        .then(function (result) {
            // console.log(result.data);
            getUserListfromServer();
            checkLoading(false);
            document.getElementsByClassName('close')[0].click();

        })
        .catch(function (err) {
            console.log(err);
        })
}

//Ham create line
function createLine(user) {
    return `
    <tr>
            <td>${i + 1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.soDT}</td>
            <td>${user.maLoaiNguoiDung}</td>
            <td>
            <button onclick="openEditBtn(${user.id})" class="btn btn-info" data-toggle="modal" data-target="#myModal">Edit</button>
            <button onclick="deleteUser(${user.id})" class="btn btn-danger">Del</button>
            </td>
            
    </tr>
        `;
}

//Ham RenderList
function renderList(arr) {
    var content = "";
    for (i = 0; i < arr.length; i++) {
        content += createLine(arr[i]);
    }
    getEle('tblDanhSachNguoiDung').innerHTML = content;
}
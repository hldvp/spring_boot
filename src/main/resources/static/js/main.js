$(document).ready(function (){
    showAllUsers();
    $('.btn-success').on('click', function (event) {
        let user = {
            name: $("#new_name").val(),

            username: $("#new_username").val(),
            password: $("#new_password").val(),
            roles: getRole("#new_role")
        }
        alert(user.name);

        fetch("api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(user)
        })
            .then(() => openTabById('nav-home'))
            .then(() => showAllUsers())
        $('input').val('');
    });
    $('option').mousedown(function (e){
        e.preventDefault();
        $(this).toggleClass('selected');
        $(this).prop('selected', !$(this).prop('selected'));
        return false;
    });
});

function createTableRow(u) {
    let userRole = "";
    for (let i = 0; i < u.roles.length; i++) {
        userRole += " " + u.roles[i].role;
    }
    return `<tr id="user_table_row">
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>${u.username}</td>
<!--            <td>${u.password}</td>-->
            <td>*************</td>
            <td>${userRole}</td>
            <td>
            <a  href="/api/${u.id}" id="eBtn" class="btn btn-info eBtn" >Edit</a>
            </td>
            <td>
            <a  href="/api/delete/${u.id}" id="delBtn" class="btn btn-danger delBtn">Delete</a>
            </td>
        </tr>`;
}


function getRole(address) {
    let data = [];
    $(address).find("option:selected").each(function () {
        data.push({
            id: $(this).val(),
            role: $(this).attr("name"),
            authority: $(this).attr("name")})
    });
    return data;
}

function showAllUsers() {
    checkUsername();
    let userTableBody = $("#users_tbody")
    userTableBody.children().remove();

    fetch("api/users")
        .then((response) => {
            response.json()
                .then(data => data.forEach(function (item) {
                    let TableRow = createTableRow(item);
                    userTableBody.append(TableRow);
                }))
        }).catch(error => console.log(error));

}

let rez;

function checkUsername() {
    fetch("api/users")
        .then(resp => {
            return resp.json()
        })
        .then(resBody => {
            console.log(resBody);
            rez = resBody.map(userName => {
                return userName.username
            })
            console.log(rez)
        })
}

function openTabById(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}

document.addEventListener('click', function (event) {
    event.preventDefault()

    if ($(event.target).hasClass('delBtn')) {
        let href = $(event.target).attr("href");
        delModalButton(href)
    }

    if ($(event.target).hasClass('eBtn')) {
        let href = $(event.target).attr("href");
        $(".editUser #exampleModal").modal();

        $.get(href, function (user) {
            $(".editUser #id").val(user.id);
            $(".editUser #nameEd").val(user.name);
            $(".editUser #ageEd").val(user.age);
            $(".editUser #usernameEd").val(user.username);
            $(".editUser #passwordEd").val(user.password);
            $(".editUser #selectRoleEd").val(user.roles);
        });
    }
    if ($(event.target).hasClass('editButton')) {
        let user = {
            id: $('#id').val(),
            name: $('#nameEd').val(),
            age: $('#ageEd').val(),
            username: $('#usernameEd').val(),
            password: $('#passwordEd').val(),
            roles: getRole("#selectRoleEd")
        }
        console.log(user);
        if (validModal() === true) {
            editModalButton(user)
        }

    }

    if ($(event.target).hasClass('logout')) {
        logout();
    }
    if ($(event.target).hasClass('btnUserTable')) {
        userTable();
    }
});
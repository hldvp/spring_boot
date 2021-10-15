$(document).ready(function (){
    showAllUsers();
    $('.btn-success').on('click', function (event) {
        let user = {
            name: $("#new_name").val(),
            username: $("#new_username").val(),
            password: $("#new_password").val(),
            roles: getRole("#new_role")
        }

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
            <a  href="/api/users/${u.id}" id="eBtn" class="btn btn-info eBtn" >Edit</a>
            </td>
            <td>
            <a  href="/api/users/${u.id}" id="delBtn" class="btn btn-danger delBtn">Delete</a>
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
            // console.log(resBody);
            rez = resBody.map(userName => {
                return userName.username
            })
            // console.log(rez)
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
        $("#exampleModal").modal();
        // console.log(href);

        fetch(href)
            .then((response) => {
                response.json()
                    .then(user => {
                        $("#add_id").val(user.id);
                        $("#add_name").val(user.name);
                        $("#add_username").val(user.username);
                        $("#add_password").val(user.password);
                        $("#add_role").val();
                    })
            })
    }
    if ($(event.target).hasClass('add_btn')) {
        let user = {
            id: $('#add_id').val(),
            name: $('#add_name').val(),
            username: $('#add_username').val(),
            password: $('#add_password').val(),
            roles: getRole("#add_role")
        }
        addUser(user);
    }

    if ($(event.target).hasClass('logout')) {
        logout();
    }
    // if ($(event.target).hasClass('btnUserTable')) {
    //     userTable();
    // }
});

function delModalButton(href) {
    fetch(href, {
        method: "DELETE"
    })
        .then(() => showAllUsers())
}

function logout () {
    document.location.replace("/logout");
}

function getUser(href) {
    let user;
    fetch(href)
        .then((response) => {
            response.json()
                .then(data => {
                    user = data
                })
        })
    return user;
}

function addUser (user) {
    fetch("api/users", {
        method: "PUT",
        headers:{
            "Content-Type": "application/json;charset=utf-8"
        },
        body:JSON.stringify(user)
    })
        .then(function (){
            $("#exampleModal").modal('hide');
            showAllUsers();
        })
}
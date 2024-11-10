function load() {
    fetch("php/display.php")
        .then((response) => response.json())
        .then((data) => {
            var tbody = document.getElementById("tbody");
            var tr = '';
            if (data['error']) {
                tbody.innerHTML = '<tr><td colspan = "5" align = "center"><h3>No Records Found</h3></td></tr>'
            } else {
                for (var i in data) {
                    tr += `<tr>
                            <td>${data[i].rollno}</td>
                            <td>${data[i].name}</td>
                            <td>${data[i].course}</td>
                            <td>${data[i].semester}</td>
                            <td><button type = 'button' onclick = "modify('${data[i].rollno}', '${data[i].name}', '${data[i].course}', '${data[i].semester}')" >Edit</button>
                            <button type = 'button' onclick = 'delStd(${data[i].rollno})'>Delete</button></td>
                            </tr > `
                }
                tbody.innerHTML = tr;
            }
        })
        .catch(() => {
            alert("Can't fetch Data");
        })
}

load();

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function openModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    const close = document.getElementById("closeBtn");
    close.addEventListener("click", () => {
        modal.style.display = "none";
    })
}

function insert() {
    const rollno = document.getElementById("rollno").value;
    const name = document.getElementById("name").value;
    const course = document.getElementById("course").value;
    const semester = document.getElementById("semester").value;

    var formdata = {
        "rollno": rollno,
        "name": name,
        "course": course,
        "semester": semester
    }

    var jsondata = JSON.stringify(formdata);

    fetch("php/insert.php", {
        method: "POST",
        body: jsondata,
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.insert == 'success') {
                alert("Data Inserted Successfully");
                closeModal();
                document.getElementById("rollno").value = '';
                document.getElementById("name").value = '';
                document.getElementById("course").value = '';
                document.getElementById("semester").value = '';
                load();
            } else {
                alert("Data Not Inserted Successfully");
            }
        })
        .catch(() => {
            alert("Can't Insert Data");
        })
}

function delStd(rollno) {
    if (confirm("Do You Want To Delete This Student")) {
        fetch("php/delete.php?del=" + rollno, {
            method: "DELETE"
        })
            .then((response) = response.json())
            .then((data) => {
                if (data.delete == 'success') {
                    alert("Student Deleted Successfully");
                    load();
                } else {
                    alert("Student Not Deleted Successfully");
                    load();
                }
            })
            .catch(() => {
                alert("Can't Delete Student");
            })
    } else {
        alert("Deletion Cancelled");
    }
}

function modify(rollno, name, course, semester) {
    document.getElementById("upd_rollno").value = rollno;
    document.getElementById("upd_name").value = name;
    document.getElementById("upd_course").value = course;
    document.getElementById("upd_semester").value = semester;

    document.getElementById("update_modal").style.display = "block";

    document.getElementById("upd_closeBtn").addEventListener("click", () => {
        document.getElementById("update_modal").style.display = "none";
    });
}

function update() {

    const rollno = document.getElementById("upd_rollno").value;
    const name = document.getElementById("upd_name").value;
    const course = document.getElementById("upd_course").value;
    const semester = document.getElementById("upd_semester").value;

    var formdata = {
        "rollno": rollno,
        "name": name,
        "course": course,
        "semester": semester
    }

    var jsondata = JSON.stringify(formdata);

    fetch("php/update.php", {
        method: "PUT",
        body: jsondata,
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.update == 'success') {
                alert("Student Updated Successfully");
                document.getElementById("update_modal").style.display = "none";
                load();
            } else {
                alert("Student Not Updated Successfully");
                load();
            }
        })
        .catch(() => {
            alert("Can't Update Student");
        })
}

function search() {
    const sRollno = document.getElementById("search").value;
    if (search === '') {
        load();
        return false;
    }

    fetch("php/search.php?srollno=" + sRollno)
        .then((response) => response.json())
        .then((data) => {
            var tbody = document.getElementById("tbody");
            var tr = '';
            if (data['error']) {
                tbody.innerHTML = '<tr><td colspan = "5" align = "center"><h3>No Records Found</h3></td></tr>'
            } else {
                for (var i in data) {
                    tr += `<tr>
                            <td>${data[i].rollno}</td>
                            <td>${data[i].name}</td>
                            <td>${data[i].course}</td>
                            <td>${data[i].semester}</td>
                            <td><button type = 'button' onclick = "modify('${data[i].rollno}', '${data[i].name}', '${data[i].course}', '${data[i].semester}')" >Edit</button>
                            <button type = 'button' onclick = 'delStd(${data[i].rollno})'>Delete</button></td>
                            </tr > `
                }
                tbody.innerHTML = tr;
            }
        })
        .catch(() => {
            alert("Can't fetch Data");
        })
}
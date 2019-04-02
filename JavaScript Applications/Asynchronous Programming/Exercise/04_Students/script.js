$(function(){
    let table = $("#results");
    
    $.ajax({
        url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/students',
        type: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("top:secret"));
        }
    }).then((data) => {
        Array.from(data)
        .sort((firstStudent, secondStudent) => firstStudent._id - secondStudent._id)
        .forEach((student) => {    
            table.append(
                "<tr>" 
                    + 
                    "<td>" + student._id + "</td>"
                    +
                    "<td>" + student.FirstName + "</td>"
                    +
                    "<td>" + student.LastName + "</td>"
                    +
                    "<td>" + student.FacultyNumber + "</td>"
                    +
                    "<td>" + student.Grade + "</td>"
                    +
                "</tr>");
        })
    });
});

function addStudent(){
    let addBtn = $("#addBtn");
    addBtn.on("click", function(){
        
        let firstName = $("#addForm .first-name").val();
        let lastName = $("#addForm .last-name").val();
        let facultyNumber = $("#addForm .faculty-number").val();
        let grade = $("#addForm .grade").val();

        $.ajax({
            url: 'https://baas.kinvey.com/appdata/kid_B1K_U76PV/students',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa("top:secret"));
            },
            data:{
                "FirstName": firstName,
                "LastName": lastName,
                "FacultyNumber": facultyNumber,
                "Grade": grade,
            }
        });
    });
}

addStudent();
"use strict"
const notePad = document.getElementById('notepad');
const title = document.getElementById('title');
const date = document.getElementById('date');
const description = document.getElementById('description');

const item = [];

let about = '';
title.addEventListener("change", function (event) {
    about = event.target.value
});

let time = '';
date.addEventListener("change", function (event) {
    time = event.target.value
});

let message = '';
description.addEventListener("change", function (event) {
    message = event.target.value
});

function resetInput() {
    title.value = '';
    date.value = '';
    description.value = ''
}

notePad.addEventListener("submit", function (event) {
    event.preventDefault();
    const note = {
        content1: about,
        content2: time,
        content3: message,
        id: new Date().getMilliseconds(),
        edited: false
    }

    if (title.value != '' && date.value != '' && description.value != '') {
        item.push(note);
        resetInput()
        getNote();
    }
})

function getNote() {
    let output = '';
    item.forEach(function (value) {
        output += `<li>
                <div>
                  <label id="content1">Title:- ${value.content1}</label><br />
                  <label id="content2">Date:- ${value.content2}</label>
                  <div>
                    <p id="content3">
                      ${value.content3}
                    </p>
                  </div>
                  <span>
                    <button  onclick="edit(event, ${value.id})">Edit</button>
                    <button type="button" onclick="deleter(${value.id})">Delete</button>
                  </span>
                </div>
            </li>`
    });

    document.getElementById('item').innerHTML = output;
    document.getElementById('count').innerHTML = item.length;
}

function edit(event, id) {
    item.find(function (note) {
        if (note?.id === id) {
            const editAbout = document.createElement("input");
            editAbout.type = "text";
            editAbout.value = note.content1;
            editAbout.placeholder = "New Title";

            const editDate = document.createElement("input");
            editDate.type = "date";
            editDate.value = note.content2;

            const editMessage = document.createElement("textarea");
            editMessage.value = note.content3;

            const content1 = document.querySelectorAll("#content1")[item.indexOf(note)];
            const content2 = document.querySelectorAll("#content2")[item.indexOf(note)];
            const content3 = document.querySelectorAll("#content3")[item.indexOf(note)];

            event.target.innerText = "Save";
            content1.replaceChildren(editAbout);

            editAbout.addEventListener("change", function (event) {
                note.content1 = event.target.value;
                content1.replaceChildren(
                    note.content1
                );
            });

            content2.replaceChildren(editDate);

            editDate.addEventListener("change", function (event) {
                note.content2 = event.target.value;
                content2.replaceChildren(
                    note.content2
                );
            });

            content3.replaceChildren(editMessage);

            editMessage.addEventListener("change", function (event) {
                note.content3 = event.target.value;
                content3.replaceChildren(
                    note.content3
                );
                getNote();
            })
        }
    })
}

function deleter(id) {
    item.find(function (note) {
        if (note?.id == id) {
            item.splice(item.indexOf(note), 1);
            getNote();
        }
    })
}
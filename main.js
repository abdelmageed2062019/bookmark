var bookmarkName = document.getElementById("name");
var websiteURL = document.getElementById("url");
var addBtn = document.querySelector("button");
var errorModal = document.getElementById("error");
var closeBtn = document.getElementById("fa-x");

var data = JSON.parse(localStorage.getItem("websites")) || [];
showData();

//regex
var regexPatternForName = /^(?!.*\s$)(?!.*[^a-zA-Z0-9]).{3,}$/;
var urlRegex = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;

//create website
function submit() {
  if (
    regexPatternForName.test(bookmarkName.value) &&
    urlRegex.test(websiteURL.value)
  ) {
    var newWebsite = {
      name: bookmarkName.value,
      url: websiteURL.value,
    };

    data.push(newWebsite);
    showData();
    localStorage.setItem("websites", JSON.stringify(data));
    clearInputs();
    bookmarkName.classList.remove("is-valid");
    websiteURL.classList.remove("is-valid");
  } else {
    errorModal.classList.remove("d-none");
    return;
  }
}

//create table data
function showData() {
  var table = "";
  for (var i = 0; i < data.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${data[i].name}</td>
    <td>
    <button class="visit">
    <a href="${data[i].url}" ><i class="fa-solid fa-eye"></i> Visit</a>
    </button>
    </td>
    <td>
    <button  onclick="deleteData(${i})" class="delete">
    <i class="fa-solid fa-trash-can"></i> Delete
    </button>
    </td>
  `;
  }
  document.getElementById("tableRow").innerHTML = table;
}

//clear inputs
function clearInputs() {
  bookmarkName.value = "";
  websiteURL.value = "";
}

//delete
function deleteData(i) {
  data.splice(i, 1);
  localStorage.setItem("websites", JSON.stringify(data));
  showData();
}

//close modal
closeBtn.addEventListener("click", function () {
  errorModal.classList.add("d-none");
});

//validation
function validateBookmarkName(reg, inp) {
  if (reg.test(inp.value)) {
    inp.classList.remove("is-invalid");
    inp.classList.add("is-valid");
  } else {
    inp.classList.add("is-invalid");
    inp.classList.remove("is-valid");
  }
}

bookmarkName.addEventListener("input", function () {
  validateBookmarkName(regexPatternForName, bookmarkName);
});

websiteURL.addEventListener("input", function () {
  validateBookmarkName(urlRegex, websiteURL);
});

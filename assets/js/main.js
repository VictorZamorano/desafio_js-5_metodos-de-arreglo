const formulario = document.getElementById("formulario");
const newTask = document.getElementById("newTask");
const total = document.getElementById("total");
const finish = document.getElementById("finish");
let taskAdd = document.getElementById("taskAdd");

const arrayTasks = [
	{ id: 167013429862, name: "Completar el desafio", finish: false },
	{ id: 165045829837, name: "Entender JS", finish: false },
	{ id: 234010029823, name: "No trabajar", finish: false },
];

const render = () => {
	let html = "";
	arrayTasks.forEach((item) => {
		html += `
		<tr id=${item.id}trBg>
			<td>${item.id}</td>
			<td>${item.name}</td>
			<td><input type="checkbox" id="${item.id}" class="check"/></td>
			<td><button onclick="eliminar(${item.id})">❌</button></td>
		</tr> `;
	});
	const headTable = `
        <tr>
			<th>ID</th>
			<th>Tarea</th>
		</tr>
        ${html}`;
	taskAdd.innerHTML = headTable;
	total.innerHTML = arrayTasks.length;

	let cb = document.querySelectorAll(".check");
	let checkBg = document.querySelectorAll("#checkBg");
	const cbArray = Array.from(cb);
	cb.forEach((checkbox) => {
		checkbox.addEventListener("change", () => {
			let cbChecked = checkbox.checked;
			function finishTask() {
				selectTask = cbArray.filter((t) => t.checked == true);
				finish.innerHTML = selectTask.length;
			}

			if (cbChecked == true) {
				pintarTr(checkbox.id, true);
				finishTask();
			} else {
				pintarTr(checkbox.id, false);
				finishTask();
			}
		});
	});
};

render();

function pintarTr(id, activo) {
	let pintar = document.getElementById(id + "trBg");
	pintar.style.backgroundColor =
		activo == true ? "green" : "rgb(209, 209, 209)";
}

function eliminar(id) {
	const index = arrayTasks.findIndex((ele) => ele.id == id);
	arrayTasks.splice(index, 1);
	render();
}

formulario.addEventListener("submit", (e) => {
	e.preventDefault();
	let number = arrayTasks.length + 1;
	if (newTask.value === "") {
		alert("Debes agregar una tarea");
		return;
	}
	arrayTasks.push({
		id: Date.now(),
		name: newTask.value,
		finish: false,
	});

	render();
	newTask.value = "";
	total.innerHTML = arrayTasks.length;
});

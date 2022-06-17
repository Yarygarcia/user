//Eliminar
const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e) => {
        if (e.target.closest(selector)) {
        handler(e);
        }
    });
    };
    on(document, "click", ".eliminar", (e) => {
        const getFila = e.target.parentNode;
        const fila = getFila.parentNode;
        const valor = getFila.firstElementChild.getAttribute("value");
        console.log(valor);
        const nombre = fila.children[2].innerHTML;
        const apellido = fila.children[3].innerHTML;
        alertify.confirm(
            `Deseas eliminar a <b>${nombre} ${apellido}</b> `,
            function () {
            // alertify.success('Ok');
                let url = `http://localhost:3000/user/eliminar/${valor}`;
                fetch(url, {
                    method: "delete",
                })
                    .then((response) => response.json())
                    .then(() => location.reload());
            },
            function () {
            alertify.error("Cancel");
            }
        );
    });
//Editar
    const modalUsuario = new bootstrap.Modal(
    document.getElementById("modalUsuario")
    );
    const formularioUser = document.getElementById("formUser");
    const id = document.getElementById("id");
    const documento = document.getElementById("documento");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const correo = document.getElementById("correo");
    const empresa = document.getElementById("empresa");
    let opcion = "";
    let idForm = 0;
    on(document, "click", ".editar", (e) => {
        const getFila = e.target.parentNode;
        const fila = getFila.parentNode;
        idForm = fila.children[0].innerHTML;
        const documentoForm = fila.children[1].innerHTML;
        const nombreForm = fila.children[2].innerHTML;
        const apellidoForm = fila.children[3].innerHTML;
        const correoForm = fila.children[4].innerHTML;
        const empresaForm = fila.children[5].innerHTML;
        id.value = idForm;
        documento.value = documentoForm;
        nombre.value = nombreForm;
        apellido.value = apellidoForm;
        correo.value = correoForm;
        empresa.value = empresaForm;
        opcion = "editar";
        modalUsuario.show();
    });

    formularioUser.addEventListener("submit", (e) => {
        e.preventDefault();
        if (opcion == "editar") {
            let url = `http://localhost:3000/user/actualizar/${idForm}`;
            fetch(url, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id.value,
                idUsuario: documento.value,
                nombres: nombre.value,
                apellidos: apellido.value,
                correo: correo.value,
                company: empresa.value,
            }),
        })
        .then((response) => response.json())
        .then((response) => location.reload());
    }
    modalUsuario.hide();
    });

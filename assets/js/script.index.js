class User {
    constructor(name, email, birthdate, city, phone, cpf) {
        this.name = name,
            this.email = email,
            this.date = birthdate,
            this.city = city,
            this.phone = phone,
            this.cpf = cpf,
            this.sign = this.getZodiacSign(),
            this.age = this.calculateAge(),
            this.client = this.possibleClient();   
    }
    calculateAge() {
        const today = new Date();
        const dates = new Date(this.birthdate);
        let day = Number( today.getFullYear() - dates.getFullYear());
        const m = Number(today.getMonth() - dates.getMonth());

        if (m < 0 || (m === 0 && today.getDate() < dates.getDate())) {
            day--;
        }

        return day;
    }
    getZodiacSign() {
        let birthdate = new Date(this.birthdate);
        let day = birthdate.getDate();
        let month = birthdate.getMonth() + 1;
        console.log("Passou pelo getSigno() da class User");

        if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
            return "Capricórnio ♑";
        } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
            return "Aquário ♒";
        } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            return "Peixes ♓";
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
            return "Áries ♈";
        } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
            return "Touro ♉";
        } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            return "Gêmeos ♊";
        } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            return "Câncer ♋";
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
            return "Leão ♌";
        } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            return "Virgem ♍";
        } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
            return "Libra ♎";
        } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            return "Escorpião ♏";
        } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            return "Sagitário ♐";
        }
    }
    possibleClient() {
        if (this.age >= 18 || this.age <= 30) { 
            return 'Sim'
        } else {
            return 'Não'
        }
    }

}
class UserList {
    constructor() {
        this.users = []
    }
    addUserList(user) {
        if (isAnyInputEmpty() == true) {
            sendErrorMsg("Preencha todos os campos")
        } else if (!valida_cpf(user.cpf) == true) {
            sendErrorMsg("Cpf invalido")
        } else {
            this.users.push(user)
            sendSuccesMsg("User enviado")
            clearInputs();
        }
    }
    countUser(){
        return this.users.length;
    }
}
const userList = new UserList();
function createUser() {
    const nameInpt = document.getElementById("name").value;
    const emailInpt = document.getElementById("email").value;
    const dateInpt = document.getElementById("birthdate").value;
    const city = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const cpf = document.getElementById("cpf").value;
    const newUser = new User(nameInpt, emailInpt, dateInpt, city, phone, cpf);
    userList.addUserList(newUser)
    showUsersList();
    clearInputs();
}
function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("birthdate").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("cpf").value = "";
}
function showUsersList() {
    let content = "";
    userList.users.forEach((user) => {
        content += `
        <div class="list-eachUser ">
        <span><b>Nome:</b>${user.name}</span>
        <span><b>E-mail:</b>${user.email}</span>
        <span><b>Data de Nascimento:</b>${dateinPTBR(user.date)}</span>
        <span><b>Cidade:</b>${user.city}</span>
        <span><b>Numero:</b>${formatedCellphone(user.phone)}</span>
        <span><b>CPF:</b>${formatedCPF(user.cpf)}</span>
        <span><b>Signo:${user.sign}</b></span>
        <span><b>Idade:${user.age}</b></span>
        <span><b>Possivel Cliente:${user.client}</b>)}</span>
        </div>
        `
    });
    document.getElementById("user-list").innerHTML = content;
    const countUsers = userList.countUser();
    document.getElementById("contador").innerHTML = `Usuários: ${countUsers}`
}
function dateinPTBR(dateInpt) {
    return dateInpt.split('-').reverse().join('/')
}
function showUsers() {
    document.getElementById("sub-div").classList.remove("hidden");
    document.getElementById("title-page").classList.add("hidden");
    document.getElementById("main-div").classList.add("hidden");
    console.log("Passou pela funcao showUsers()");
}
function showRegister() {
    document.getElementById("sub-div").classList.add("hidden");
    document.getElementById("title-page").classList.remove("hidden");
    document.getElementById("main-div").classList.remove("hidden");
    console.log("Passou pela funcao showRegister()");

}
function sendErrorMsg(msg) {
    console.log("Passou pela funcao sendErrorMsg()");

    document.getElementById("error-msg").innerHTML = msg;
    document.getElementById("error-msg").classList.remove("hidden");
    setTimeout(function () {
        document.getElementById("error-msg").classList.add("hidden");
    }, 4000);
}
function sendSuccesMsg(msg) {
    console.log("Passou pela funcao sendSuccesMsg()");

    document.getElementById("success-msg").innerHTML = msg;
    document.getElementById("success-msg").classList.remove("hidden");
    setTimeout(function () {
        document.getElementById("success-msg").classList.add("hidden");
    }, 4000);
}
function formatedCPF(cpf) {
    console.log("Passou pela funcao formatedCPF()");

    let cpfArray = cpf.split("");
    let cpfFormated = cpfArray[0] + cpfArray[1] + cpfArray[2]
        + "." + cpfArray[3] + cpfArray[4] + cpfArray[5] + "."
        + cpfArray[6] + cpfArray[7] + cpfArray[8] + "-" + cpfArray[9] + cpfArray[10];
    return cpfFormated;
}
function valida_cpf(cpf) {
    console.log("Passou pela funcao valida_cpf()");

    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    else
        return false;
}
function formatedCellphone(phone) {
    console.log("Passou pela funcao formatedCellphone()");

    let cellphoneArray = phone.split("");
    let cellphoneFormated = "(" + cellphoneArray[0] + cellphoneArray[1] + ")"
        + " " + cellphoneArray[2] + cellphoneArray[3] + cellphoneArray[4]
        + cellphoneArray[5] + cellphoneArray[6] + "-"
        + cellphoneArray[7] + cellphoneArray[8]
        + cellphoneArray[9] + cellphoneArray[10];
    return cellphoneFormated;
}
function isAnyInputEmpty() {
    const nameInpt = document.getElementById("name").value;
    const emailInpt = document.getElementById("email").value;
    const dateInpt = document.getElementById("birthdate").value;
    const city = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const cpf = document.getElementById("cpf").value;
    if (nameInpt == "" || emailInpt == "" || dateInpt == "" || city == "" || phone == "" || cpf == "") {
        return true
    }
}
/*
getZodiacSign() {
    let birthdate = new Date(this.birthdate);
    let day = birthdate.getDate();
    let month = birthdate.getMonth() + 1;
    console.log("Passou pelo getSigno() da class User");

    if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
        return "Capricórnio ♑";
    } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
        return "Aquário ♒";
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
        return "Peixes ♓";
    } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
        return "Áries ♈";
    } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
        return "Touro ♉";
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
        return "Gêmeos ♊";
    } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
        return "Câncer ♋";
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
        return "Leão ♌";
    } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
        return "Virgem ♍";
    } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
        return "Libra ♎";
    } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
        return "Escorpião ♏";
    } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
        return "Sagitário ♐";
    }
}
function formatedCPF(cpf) {
    console.log("Passou pela funcao formatedCPF()");

    let cpfArray = cpf.split("");
    let cpfFormated = cpfArray[0] + cpfArray[1] + cpfArray[2]
        + "." + cpfArray[3] + cpfArray[4] + cpfArray[5] + "."
        + cpfArray[6] + cpfArray[7] + cpfArray[8] + "-" + cpfArray[9] + cpfArray[10];
    return cpfFormated;
}

function formatedCellphone(cellphone) {
    console.log("Passou pela funcao formatedCellphone()");

    let cellphoneArray = cellphone.split("");
    let cellphoneFormated = "(" + cellphoneArray[0] + cellphoneArray[1] + ")"
        + " " + cellphoneArray[2] + cellphoneArray[3] + cellphoneArray[4]
        + cellphoneArray[5] + cellphoneArray[6] + "-"
        + cellphoneArray[7] + cellphoneArray[8]
        + cellphoneArray[9] + cellphoneArray[10];
    return cellphoneFormated;
}

function valida_cpf(cpf) {
    console.log("Passou pela funcao valida_cpf()");

    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    else
        return false;
}


*/

// how many functions are there? 12
// how many classes are there? 2

// Boa sorte!
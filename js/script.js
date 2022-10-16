class Boletim {
    constructor() {
        this.id = 1;
        this.arrayBoletins = [];
        this.editId = null;
    }



    salvar() {
        
        let boletim = this.lerDados();            
        if (this.validarCampos(boletim)) {
            if (this.editId == null) {
                this.adicionarDados(boletim);       
            } else {
                this.atualizar(this.editId, boletim);
            }    
        }
        this.listaTabela();
        this.cancelar();        
    }



    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = ' ';

               
        for (let i = 0; i < this.arrayBoletins.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_nomeAluno = tr.insertCell();
            let td_nota1 = tr.insertCell();
            let td_nota2 = tr.insertCell();
            let td_notaFinal = tr.insertCell();
            let td_frequencia = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayBoletins[i].id;
            td_nomeAluno.innerText = (this.arrayBoletins[i].nomeAluno);
            td_nota1.innerText = this.arrayBoletins[i].nota1;
            td_nota2.innerText = this.arrayBoletins[i].nota2;
            td_notaFinal.innerText = ((this.arrayBoletins[i].nota1 + this.arrayBoletins[i].nota2) / 2).toFixed(2);
            td_frequencia.innerText = (((this.arrayBoletins[i].frequencia * 100) / this.arrayBoletins[i].totalAulasSemestre).toFixed(0) );



            tr.classList.add('itens');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar-arquivo.png';
            imgEdit.setAttribute("onclick", "boletim.editar(" + JSON.stringify(this.arrayBoletins[i]) + ")");
            


            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/deletar-usuario.png';
            imgDelete.setAttribute("onclick", "boletim.deletar(" + this.arrayBoletins[i].id + ")");
            

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
           

            if (td_notaFinal.innerText >= 7 && td_frequencia.innerText >= 80) {
                tr.style.backgroundColor = '#ebf5bb';
                console.log(this.arrayBoletins);
            } else {
                tr.style.backgroundColor = '#f8bfbf'
                console.log(this.arrayBoletins);
            }
                    
        }
    }

    
    
    adicionarDados(boletim) {       

        boletim.nota1 = parseFloat(boletim.nota1);
        boletim.nota2 = parseFloat(boletim.nota2);
        boletim.notaFinal = parseFloat(boletim.notaFinal);
        boletim.frequencia = parseInt(boletim.frequencia);

        this.arrayBoletins.push(boletim);
        this.id++;
    }


    atualizar(id, boletim) {
        for (let i = 0;  i < this.arrayBoletins.length;  i++) {
            if (this.arrayBoletins[i].id == id) {
                this.arrayBoletins[i].nomeAluno = boletim.nomeAluno;
                this.arrayBoletins[i].nota1 = boletim.nota1
                this.arrayBoletins[i].nota2 = boletim.nota2
                this.arrayBoletins[i].totalAulasSemestre = boletim.totalAulasSemestre
                this.arrayBoletins[i].frequencia = boletim.frequencia
           }
        }
    }


    editar(dados) {
        this.editId = dados.id;

        document.getElementById('nomeAluno').value = dados.nomeAluno;
        document.getElementById('nota1').value = dados.nota1;
        document.getElementById('nota2').value = dados.nota2;
        document.getElementById('totalAulasSemestre').value = dados.totalAulasSemestre;
        document.getElementById('frequencia').value = dados.frequencia;

        document.getElementById('btn-um').innerText = 'Atualizar';
    }

   /* capitalizeNomeAluno() {
        let nomeA = nomeAluno(0).toUpperCase() + nomeAluno.slice(1).toLowerCase();
   }*/

    lerDados() {
        let boletim = {}


        boletim.id = this.id;
        boletim.nomeAluno = document.getElementById('nomeAluno').value;
        boletim.nota1 = parseFloat(document.getElementById('nota1').value);
        boletim.nota2 = parseFloat(document.getElementById('nota2').value);
        boletim.totalAulasSemestre = parseInt(document.getElementById('totalAulasSemestre').value);
        boletim.frequencia = parseInt(document.getElementById('frequencia').value);
                
       

        return (boletim);
    }


    validarCampos(boletim) {
        let msg = '';

        if (boletim.nomeAluno == '') {
            msg += '- Por favor, informe o nome do aluno\n';
        }
        if (boletim.nota1 == '') {
            msg += '- Por favor, informe a nota 1\n';
        }
       if(boletim.nota2 == '') {
            msg += '- Por favor, informe informe a nota 2\n';
        }
        if (boletim.totalAulasSemestre == '') {
            msg += '- Por favor, informe a quantidade de aulas ministradas\n';
        }
       if (boletim.frequencia == '') {
            msg += '- Por favor, informe a frequência\n';
        }
        if (msg != '') {
            alert(msg);
            return false;
        }
        return true;
    }


    cancelar() {
        document.getElementById('nomeAluno').value = ' ';
        document.getElementById('nota1').value = ' ';
        document.getElementById('nota2').value = ' ';
        document.getElementById('totalAulasSemestre').value = ' ';
        document.getElementById('frequencia').value = ' ';

        document.getElementById('btn-um').innerText = 'Salvar';
        this.editId = null;
    }

    deletar(id) {

        if (confirm('Deseja realmente exluir o boletim: ' + id)) {
            
        let tbody = document.getElementById('tbody');

        for (let i = 0;  i < this.arrayBoletins.length;  i++) {
            if (this.arrayBoletins[i].id == id) {
                this.arrayBoletins.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
        }  
    }   
}    


let boletim = new Boletim();

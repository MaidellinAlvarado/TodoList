
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
        this.completa = false; 
    }
}


class ListaEnlazada {
    constructor() {
        this.head = null;
        this.size = 0;
    }

  
    add(elemento) {
        const nuevoNodo = new Nodo(elemento);
        if (!this.head) {
            this.head = nuevoNodo;
        } else {
            let current = this.head;
            while (current.siguiente) {
                current = current.siguiente;
            }
            current.siguiente = nuevoNodo;
        }
        this.render();
    }


    remove(valor) {
        if (!this.head) {
            return false;
        }

        let current = this.head;
        let previous = null;

      
        while (current) {
            if (current.valor === valor) {
                if (previous === null) {
                    this.head = current.siguiente; 
                } else {
                    previous.siguiente = current.siguiente; 
                }
                this.size--;
                this.render();
                return true;
            }
            previous = current;
            current = current.siguiente;
        }

        return false;
    }

    toggleCompleta(valor) {
        let current = this.head;
        while (current) {
            if (current.valor === valor) {
                current.completa = !current.completa;
                this.render();
                return true;
            }
            current = current.siguiente;
        }
        return false;
    }

    render() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        let current = this.head;

        while (current) {
            const li = document.createElement('li');
            li.textContent = current.valor;

          
            if (current.completa) {
                li.classList.add('completed');
            }

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                const taskValue = li.textContent.trim(); 
                this.remove(taskValue);
            });
            li.appendChild(deleteButton);

            const completeButton = document.createElement('button');
            completeButton.textContent = current.completa ? 'Undo' : 'Complete';
            completeButton.addEventListener('click', () => {
                const taskValue = li.textContent.trim(); 
                this.toggleCompleta(taskValue);
            });
            li.appendChild(completeButton);

            taskList.appendChild(li);

            current = current.siguiente;
        }
    }
}


const ListaDeTareas = new ListaEnlazada();


const addTask = () => {
    const taskInput = document.getElementById('task-input');
    const taskValue = taskInput.value.trim();
    if (taskValue !== '') {
        ListaDeTareas.add(taskValue);
        taskInput.value = '';
    }
};


document.getElementById('add').addEventListener('click', addTask);


document.getElementById('task-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});


document.getElementById('task-list').addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        const action = event.target.textContent.toLowerCase();
        const taskValue = event.target.parentElement.textContent.split('Delete')[0].trim();

        if (action === 'delete') {
            ListaDeTareas.remove(taskValue);
        } else if (action === 'complete' || action === 'undo') {
            ListaDeTareas.toggleCompleta(taskValue);
        }
    }
});

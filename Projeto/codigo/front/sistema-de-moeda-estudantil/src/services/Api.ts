class Api {
    static async login(email: string, senha: string) {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        return response.json();
    }

    static async register(type: string, data: object) {
        const response = await fetch(`http://localhost:8080/api/${type}/salvar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    }

    static async getInstitutions() {
        const response = await fetch('http://localhost:8080/api/instituicao/listar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.json();
    }

    static async getStudent() {
        const response = await fetch('http://localhost:8080/api/student/listar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.json();
    }

    static async getEnterprise() {
        const response = await fetch('http://localhost:8080/api/entreprise/listar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.json();
    }

    static async updateUser(type: string, data: object) {
        const response = await fetch(`http://localhost:8080/api/${type}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response;
    }

    static async deleteAccount(type: string, email: string) {
        const response = await fetch(`http://localhost:8080/api/${type}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
            }),
        });

        return response;
    }

    static async getProfessors() {
        const response = await fetch('http://localhost:8080/api/professor/listar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.json();
    }
}

export default Api;
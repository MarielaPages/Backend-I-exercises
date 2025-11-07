import fs from 'fs'

class User{
    constructor(userName, userLastName){
        this.userName = userName
        this.userLastName = userLastName
    }
}



class UsersManager{
    constructor(archivo){
        this.archivoUsuarios = archivo
    }
    async addUser(user){
        try{
            //Leo los datos guardados en un arcchivo
            let data = await fs.promises.readFile(`${this.archivoUsuarios}`, 'utf-8')
            //los parseo para poder trabajar con ellos en formato JS
            let usersArray = JSON.parse(data)

            //le doy un id al usuario de forma que no se repita
            user.id = 0
            if(usersArray.length === 0){
                user.id = 1
            }
            if (usersArray.length !== 0){
                let idUser = usersArray[usersArray.length -1].id + 1
                user.id = idUser
            }

            //agrego el user a la lista de usuarios
            usersArray.push(user)

            //sobreescribo la lista de usuarios con todos los usuarios incluido el nuevo
            await fs.promises.writeFile(`${this.archivoUsuarios}`, `${JSON.stringify(usersArray)}`)


        }catch(err){
            throw err
        }
    }
    async getUsers(){
        try{
            //Leo los datos guardados en un arcchivo
            let data = await fs.promises.readFile(`${this.archivoUsuarios}`, 'utf-8')
            let usuarios = JSON.parse(data)

            //devuelvo la lista de usuarios
            return usuarios

        }catch(err){
            throw err
        }
        
    }
    async deleteUser(userId){
        try{
            //Leo los datos guardados en un arcchivo
            let data = await fs.promises.readFile(`${this.archivoUsuarios}`, 'utf-8')
            let usuarios = JSON.parse(data)

            //Filtro todos los usuarios que no tienen el id pasado
            let usuariosSinIdUser = usuarios.filter(user => user.id !== userId)

            //sobreescribo la lista de usuarios sin el usuario con el id pasado
            await fs.promises.writeFile(`${this.archivoUsuarios}`, `${JSON.stringify(usuariosSinIdUser)}`)

        }catch(err){
            throw err
        }
    }


}

let user1 = new User('Roberto', 'Suarez')
let user2 = new User('Juan', 'Alvarez')
let user3 = new User('Sofia', 'Perez')
let userManager1 = new UsersManager('./users.txt')
console.log(userManager1)

async function asyncFunction(){
    await userManager1.addUser(user1)
    await userManager1.addUser(user2)
    await userManager1.addUser(user3)
    console.log(await userManager1.getUsers())
    //await userManager1.deleteUser(2)
}

//asyncFunction()
import React, { Component } from 'react';
import {                                            //redireccionamiento
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import './estilo.css';                              //estilo
import Categorias from '../Categorias/Categorias.js'  //Categorias
import Productos from '../Productos/Productos';
import RenderProducto from '../Productos/RenderProducto';


class Datos extends Component {
    constructor() {
        super();
        this.state = {
            categorias: [],
            productos: [],
            usuarios: 0,
        }
    }

    componentDidMount() {
        fetch("/api/categorias/cantidad")
            .then(respuesta => { return respuesta.json() })
            .then(listaCategorias => {
                this.setState({ categorias: listaCategorias.data })
            })
            .catch(error => console.log(error))
        fetch("/api/productos")
            .then(respuesta => { return respuesta.json() })
            .then(listaProductos => {
                this.setState({ productos: listaProductos.data })
            })
            .catch(error => console.log(error))
        fetch("/api/usuarios")
            .then(respuesta => { return respuesta.json() })
            .then(users => {
                this.setState({ usuarios: users.data })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <Router>
                <section className="info-boxes">
                    <Link to='/categorias'>
                        <div className="info-box">
                            <div className="box-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 20V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1zm-2-1H5V5h14v14z" /><path d="M10.381 12.309l3.172 1.586a1 1 0 0 0 1.305-.38l3-5-1.715-1.029-2.523 4.206-3.172-1.586a1.002 1.002 0 0 0-1.305.38l-3 5 1.715 1.029 2.523-4.206z" /></svg>
                            </div>

                            <div className="box-content">
                                <span className="big">{this.state.categorias.length}</span>
                                Categorias existentes
                            </div>
                        </div>
                    </Link>
                    <Link to='/productos'>
                        <div className="info-box">
                            <div className="box-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 10H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1zm-1 10H5v-8h14v8zM5 6h14v2H5zM7 2h10v2H7z" /></svg>
                            </div>

                            <div className="box-content">
                                <span className="big">{this.state.productos.length}</span>
                                Cantidad de productos
                            </div>
                        </div>
                    </Link>
                    <Link to='/usuarios'>
                        <div className="info-box active">
                            <div className="box-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3,21c0,0.553,0.448,1,1,1h16c0.553,0,1-0.447,1-1v-1c0-3.714-2.261-6.907-5.478-8.281C16.729,10.709,17.5,9.193,17.5,7.5 C17.5,4.468,15.032,2,12,2C8.967,2,6.5,4.468,6.5,7.5c0,1.693,0.771,3.209,1.978,4.219C5.261,13.093,3,16.287,3,20V21z M8.5,7.5 C8.5,5.57,10.07,4,12,4s3.5,1.57,3.5,3.5S13.93,11,12,11S8.5,9.43,8.5,7.5z M12,13c3.859,0,7,3.141,7,7H5C5,16.141,8.14,13,12,13z" /></svg>
                            </div>

                            <div className="box-content">
                                <span className="big">{this.state.usuarios}</span>
                                Cantidad de usuarios registrados
                            </div>
                        </div>
                    </Link>
                </section>
                <Routes>

                    <Route path="/categorias/*" element={<Categorias cat={this.state.categorias} key="categorias"></Categorias>}>
                    </Route>

                    <Route path="/productos" element={<Productos productos={this.state.productos} key='productos' />}>
                    </Route>
                    <Route path="/productos/:id" element={<RenderProducto key='renderProducto' />}>
                    </Route>

                    <Route path="/usuarios">

                    </Route>
                </Routes>
            </Router>
        );
    }
}

export default Datos;
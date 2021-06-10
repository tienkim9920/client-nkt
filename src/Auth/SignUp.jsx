import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import User from '../API/User';
import { useForm } from "react-hook-form";

const defaultValues = {
    email: "",
    fullname: "",
    password: ""
};

function SignUp(props) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues });

    const [show_success, set_show_success] = useState(false)

    const [username_exist, set_username_exist] = useState(false)

    const onSubmit = async (data) => {

            const body = {
                username: data.username,
                password: data.password,
                fullname: data.fullname,
                email: data.email,
                id_permission: '6087dcb5f269113b3460fce4'
            }

            const response = await User.Post_User(body)

            console.log(response)

            if (response === 'User Da Ton Tai'){
                set_username_exist(true)
            }else{
                set_show_success(true)
                set_username_exist(false)
                
                reset({ defaultValues })
            }

            setTimeout(() => {
                set_show_success(false)
            }, 2500)

    } 


    return (
        <div>

            {
                show_success && 
                    <div className="modal_success">
                        <div className="group_model_success pt-3">
                            <div className="text-center p-2">
                                <i className="fa fa-bell fix_icon_bell" style={{ fontSize: '40px', color: '#fff' }}></i>
                            </div>
                            <h4 className="text-center p-3" style={{ color: '#fff' }}>Bạn Đã Đăng Ký Thành Công!</h4>
                        </div>
                    </div>
            }

            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li className="active">Register</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="page-section mb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xs-12 mr_signin">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="login-form">
                                    <h4 className="login-title">Register</h4>
                                    <div className="row">
                                        <div className="col-md-12 mb-20">
                                            <label>Email *</label>
                                            <input placeholder="Enter Email" className="mb-0" id="email" {...register('email', { required: true })} />
                                                {errors.email && errors.email.type === "required" && <span style={{ color: 'red' }}>* Email is required</span>}
                                        </div>
                                        <div className="col-md-12 mb-20">
                                            <label>Full Name *</label>
                                            <input placeholder="Enter Fullname" className="mb-0" id="fullname" {...register('fullname', { required: true })} />
                                                {errors.fullname && errors.fullname.type === "required" && <span style={{ color: 'red' }}>* Fullname is required</span>}
                                        </div>
                                        <div className="col-md-12 mb-20">
                                            <label>Username *</label>
                                            <input placeholder="Enter Username" className="mb-0" id="username" {...register('username', { required: true })} />
                                                {errors.username && errors.username.type === "required" && <span style={{ color: 'red' }}>* Username is required</span>}
                                            {
                                                username_exist && <span style={{ color: 'red' }}>* Username is existed</span>
                                            }
                                        </div>
                                        <div className="col-md-12 mb-20">
                                            <label>Password *</label>
                                            <input placeholder="Enter Password" type="password" className="mb-0" id="password" {...register('password', { required: true })} />
                                                {errors.password && errors.password.type === "required" && <span style={{ color: 'red' }}>* Password is required</span>}
                                        </div>
                                        <div className="col-md-12 mb-20">
                                            <div className="d-flex justify-content-end">
                                                <Link to="/signin">Do You Want To Login?</Link>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="register-button mt-0" style={{ cursor: 'pointer' }}>Register</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
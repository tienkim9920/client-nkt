import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Question from '../API/Question';
import { useForm } from "react-hook-form";
import { debounce, useDebounce } from 'debounce-react'

Ten.propTypes = {
    addAnswer: PropTypes.func,
    addTime: PropTypes.func,
    result: PropTypes.object,
    reset_result: PropTypes.func
};

Ten.defaultProps = {
    addAnswer: null,
    addTime: null,
    result: null,
    reset_result: null
}

const containerVariants = {
    hidden: {
        opacity: 0,
        x: '100vw'
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', delay: 0.5 }
    },
    exit: {
        x: "-100vh",
        transition: { ease: 'easeInOut' }
    }
};

const nextVariants = {
    hidden: {
        x: '-100vw'
    },
    visible: {
        x: 0,
        transition: { type: 'spring', stiffness: 120 }
    }
}

const buttonVariants = {
    hover: {
        scale: 1.1,
        textShadow: "0px 0px 8px rgb(255,255,255)",
        boxShadow: "0px 0px 8px rgb(255,255,255)",
        transition: {
            duration: 0.3,
            yoyo: Infinity
        }
    }
}


function Ten(props) {

    const [loader, set_loader] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {

        if (result.answer.length < 5) {
            return
        }

        set_loader(true)

        debounce(post_answer, 2000)

    };

    async function post_answer() {

        addAnswer(check)

        addTime(time)

        const data_result = {
            name: result.name,
            question1: result.answer[0],
            question2: result.answer[1],
            question3: result.answer[2],
            question4: result.answer[3],
            question5: result.answer[4],
            question6: result.answer[5],
            question7: result.answer[6],
            question8: result.answer[7],
            question9: result.answer[8],
            question10: result.answer[9],
            time1: result.time[0],
            time2: result.time[1],
            time3: result.time[2],
            time4: result.time[3],
            time5: result.time[4],
            time6: result.time[5],
            time7: result.time[6],
            time8: result.time[7],
            time9: result.time[8],
            time10: result.time[9],
        }

        const response = await Question.post_answer(data_result)
        console.log(response)

        sessionStorage.setItem('id_user', response._id)

        reset_result("123")

        set_redirect(true)

    }

    const { addAnswer, result, addTime, reset_result } = props

    const answer = ['NashTech', 'KMS Technology', 'TMA Solution', 'Fujinet Systems'];

    const [time, set_time] = useState(parseInt(60))

    const [check, set_check] = useState(false)

    const [redirect, set_redirect] = useState(false)


    useEffect(() => {

        const second = setTimeout(() => {
            if (parseInt(time) === 0 || time === "Hết giờ =)))") {
                set_time("Hết giờ =)))")
                return
            }

            set_time(time - 1)

        }, 1000)

        return () => clearTimeout(second)

    }, [time])

    return (
        <div>
            {
                loader && (<div className="wrapper_loader">
                    <div className="sk-cube-grid">
                        <div className="sk-cube sk-cube1"></div>
                        <div className="sk-cube sk-cube2"></div>
                        <div className="sk-cube sk-cube3"></div>
                        <div className="sk-cube sk-cube4"></div>
                        <div className="sk-cube sk-cube5"></div>
                        <div className="sk-cube sk-cube6"></div>
                        <div className="sk-cube sk-cube7"></div>
                        <div className="sk-cube sk-cube8"></div>
                        <div className="sk-cube sk-cube9"></div>
                    </div>
                </div>)
            }


            <motion.div
                style={{ textAlign: 'right', paddingRight: '3rem' }}
                initial={{ x: '-100vw' }}
                animate={{ x: 0, type: 'spring', stiffness: 120 }}
                transition={{ delay: 1.5 }}
            >Thời gian: {time} {time === 'Hết giờ =)))' ? '' : 's'}</motion.div>
            <motion.div className="base container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            ></motion.div>

            <motion.div className="base container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <h3>Câu 10: Mục tiêu của Tiền là được làm ở công ty nào?</h3>
                <ul>
                    {answer.map((value, index) => {
                        let active = check === value ? 'active' : ''
                        return (
                            <motion.li key={index} onClick={() => set_check(value)}
                                whileHover={{ scale: 1.3, originX: 0, color: '#f8e112' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <span className={active}>{value}</span>
                            </motion.li>
                        )
                    }
                    )}
                </ul>

                {check && (
                    <motion.form className="next"
                        variants={nextVariants}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {
                            redirect && <Redirect to="/finish" />
                        }
                        <motion.button
                            type="submit"
                            variants={buttonVariants}
                            whileHover="hover"
                        >
                            Hoàn Thành
                    </motion.button>
                    </motion.form>
                )}

            </motion.div>
        </div>

    );
}

export default Ten;
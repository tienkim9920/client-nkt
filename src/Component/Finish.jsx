import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import Question from '../API/Question';

const containerVariants = {
    hidden: {
        opacity: 0,
        x: '100vw',
        transition: {
            staggerChildren: 0.5,
        }
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            mass: 0.4,
            damping: 8,
            staggerChildren: 0.4,
            when: "beforeChildren",
        }
    },
};

const childVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }
}

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

function Finish(props) {

    const [show_modal, set_show_modal] = useState(false)

    const handler_score = () => {

        set_show_modal(true)

    }

    const [result, set_result] = useState({})

    useEffect(() => {

        const fetchData = async () => {

            const response = await Question.get_answer(sessionStorage.getItem('id_user'))

            set_result(response)

        }

        fetchData()

    }, [])


    return (
        <div>

            {
                show_modal && <Modal />
            }
            <motion.div className="container order"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <h2>Cảm ơn bạn đã tham gia!</h2>
                <h4>Đây là đáp án bạn đã chọn!</h4>
                <motion.div variants={childVariants}>
                    {/* {
                        result.answer && result.answer.map((value, index) => (
                            <div key={index}>Câu {index + 1}: {value}</div>
                        ))
                    } */}
                    <div>Câu 1: {result.question1}</div>
                    <div>Câu 2: {result.question2}</div>
                    <div>Câu 3: {result.question3}</div>
                    <div>Câu 4: {result.question4}</div>
                    <div>Câu 5: {result.question5}</div>
                    <div>Câu 6: {result.question6}</div>
                    <div>Câu 7: {result.question7}</div>
                    <div>Câu 8: {result.question8}</div>
                    <div>Câu 9: {result.question9}</div>
                    <div>Câu 10: {result.question10}</div>
                </motion.div>
                <motion.div className="next"
                    variants={nextVariants}
                >
                    <motion.button
                        onClick={handler_score}
                        variants={buttonVariants}
                        whileHover="hover"
                    >
                        Xem Kết Quả
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>

    );
}

export default Finish;
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HotelImage from "../../assets/image/Hotel.png";

export const Container = styled.div`
  min-height: 100vh;
  background-color: #0f0f0f;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Box = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  background-color: #1f1f1f;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
`;

export const Image = styled.div`
  background-image: url(${HotelImage});
  background-size: cover;
  background-position: center;
  height: 200px;
`;

export const Content = styled.div`
  padding: 40px 30px;
  color: white;
  position: relative;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: none;
  outline: none;
`;

export const Button = styled(motion.button)`
  background: white;
  color: black;
  font-weight: bold;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
`;

export const BackLink = styled(Link)`
  position: absolute;
  bottom: 20px;
  left: 30px;
  color: #999;
  font-size: 13px;
  text-decoration: none;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

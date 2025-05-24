/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HotelImage from "../../assets/image/Hotel.png";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f0f0f;
`;

export const Box = styled.div`
  display: flex;
  width: 900px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
`;

export const Left = styled.div`
  flex: 1;
  background-color: #1f1f1f;
  color: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

export const Title = styled.h2`
  font-size: 26px;
  margin-bottom: 24px;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: none;
  outline: none;
  width: 100%;
`;

export const MotionButton = styled(motion.button)`
  background: white;
  color: black;
  font-weight: bold;
  border: none;
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
`;

export const Right = styled(motion.div)`
  flex: 1;
  background-image: url(${HotelImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RecoveryButton = styled(motion.a)`
  background: white;
  color: black;
  font-weight: bold;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
`;

export const BackLink = styled(Link)`
  position: absolute;
  bottom: 20px;
  left: 0;
  padding-left: 20px;
  color: #999;
  font-size: 13px;
  text-decoration: none;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

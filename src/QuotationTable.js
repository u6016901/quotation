import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

import { FaTrash } from 'react-icons/fa';

const styles = {
  textCenter: { textAlign: "center" },
  textRight: { textAlign: "right" },
};

function QuotationTable({ data, setDataItems }) {
  const [dataRows, setDataRows] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [calDiscount, setCalDiscount] = useState(0);

  useEffect(() => {
    let sum = 0;
    let discount = 0;
    let disTol = 0;
    const z = data.map((v, i) => {
      let amount = v.qty * v.ppu;
      let outDis = amount - v.dis;
      sum += amount;
      disTol += v.dis * 1;
      if (sum < 0) sum = 0;
      discount += outDis;
      if (discount < 0) discount = 0;
      return (
        <tr key={i}>
          <td><FaTrash onClick={() => deleteClick(i)}/></td>
          <td style={styles.textCenter}>{v.qty}</td>
          <td>{v.item}</td>
          <td style={styles.textRight}>{numberWithCommas(v.ppu)}</td>
          <td style={styles.textRight}>{numberWithCommas(amount)}</td>
          <td style={styles.textRight}>{numberWithCommas(v.dis)}</td>
        </tr>
      );
    });

    setDataRows(z);
    setTotalPrice(disTol);
    setCalDiscount(discount);
  }, [data]);

  const deleteClick = (i) => {
    data.splice(i,1)
    setDataItems([...data])
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const clearTable = () => {
    setDataItems([]);
    setDataRows([]);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Kasidit's Quotation Table</h1>
        </Col>
        <Col style={styles.textRight}>
          <Button onClick={clearTable} variant="dark">
            Clear
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Qty</th>
            <th>Item</th>
            <th>Price/Unit</th>
            <th>Amount</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
        <tr>
          <th colSpan={3}></th>
            <th style={styles.textCenter}>Total Discount</th>
            <th style={styles.textRight}>{numberWithCommas(totalPrice)}</th>
          </tr>
          <tr>
            <th colSpan={3}></th>
            <th style={styles.textCenter}>Total</th>
            <th style={styles.textRight}>{numberWithCommas(calDiscount)}</th>
          </tr>
          
        </tfoot>
      </Table>
    </Container>
  );
}

export default QuotationTable;

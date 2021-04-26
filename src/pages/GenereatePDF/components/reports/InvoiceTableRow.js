import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'center',
        paddingRight: 8,
    },
    price: {
        borderLeftColor: borderColor,
        borderLeftWidth: 1,
    },
  });


const InvoiceTableRow = ({items}) => {
    const rows = items&&items.map( item => 
        <View style={styles.row} key={item.name.toString()}>
            <Text style={styles.description}>{item.name}</Text>
            <Text style={styles.qty}>{item.qty}</Text>
            <Text style={styles.amount}>{item.unit_price}</Text>
            <Text style={styles.price}>{item.total}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow
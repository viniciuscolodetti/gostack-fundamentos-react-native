import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    const cartPriceTotal = products.reduce(
      (accumulator, product) => {
        accumulator.total += product.price * product.quantity;
        return accumulator;
      },
      { total: 0 },
    );

    return formatValue(cartPriceTotal.total);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const cartQuantityTotal = products.reduce(
      (accumulator, product) => {
        accumulator.total += product.quantity;
        return accumulator;
      },
      { total: 0 },
    );

    return cartQuantityTotal.total;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;

import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { I18nContext } from '../../../contexts/i18n';
import ButtonGroup from '../../../components/ui/button-group';
import Button from '../../../components/ui/button';
import InfoTooltip from '../../../components/ui/info-tooltip';
import Box from '../../../components/ui/box';
import Typography from '../../../components/ui/typography';

const {
  TypographyVariant,
  AlignItems,
  JustifyContent,
  DISPLAY,
  SEVERITIES,
  FlexDirection
} = require('../../../helpers/constants/design-system');
const {
  Slippage,
  SLIPPAGE_VERY_HIGH_ERROR,
  SLIPPAGE_NEGATIVE_ERROR
} = require('../../../../shared/constants/swaps');

const {
    BannerAlert,
    Modal: DeprecatedModalContent
} = require('../../../components/component-library');
const { ModalContent: DeprecatedModalContentWrapper, ModalHeader: DeprecatedModalHeader } = require('../../../components/component-library/modal-content/deprecated');

export default function TransactionSettings({
    onSelect,
    onModalClose,
    maxAllowedSlippage: maxLimitSlippageProp = Infinity, // Default to no upper limit if not provided.
    currentSlippageProp = Slippage.default || '',
    isDirectWrappingEnabledProp = false,


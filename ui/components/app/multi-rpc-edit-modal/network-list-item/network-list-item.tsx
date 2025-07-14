import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  NetworkConfiguration,
  RpcEndpointType,
} from '@ardovapp/network-controller';
import {
  Box,
  Text,
  AvatarNetwork,
  AvatarNetworkSize,
  Button,
  PopoverPosition
} from '../../../component-library';
import {
   AlignItems, BackgroundColor, Display, FlexDirection, TextColor, TextVariant, JustifyContent
} from '../../../../helpers/constants/design-system';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import { setEditedNetwork, toggleNetworkMenu } from '../../../../store/actions';

const NetworkListItem = ({ networkConfiguration }) => {
 const rpcEndpoint = networkConfiguration.rpcEndpoints[networkConfiguration.defaultRpcEndpointIndex];
 const t = useI18nContext();
 const [isOpenTooltip] = useState(false);
 const dispatch = useDispatch();

 return (
   <Box display={Display.Flex}
        alignItems={AlignItems.center}
        flexDirection={FlexDirection.Row}
        justifyContent={JustifyContent.spaceBetween}>
     <Box display={Display.Flex} alignItems={AlignItems.center}>
       <AvatarNetwork size={AvatarNetworkSize.Md}
                      src=
            CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[networkConfiguration.chainId]
                      name=
            networkConfiguration.name />
       <Box display= {Display.Flex}
             flexDirection= {FlexDirection.Column}>
         <Text color= {TextColor.textDefault} backgroundColor=
          BackgroundColor.transparent ellipsis>
          {networkConfiguration.name}</Text>
         <Box marginLeft=4>
           <Text as="button" variant=TextVariant.bodySmMedium color=
             TextColor.textAlternative width=220 textAlign=Left onMouseEnter={() => setIsOpenTooltip(true)}
              onMouseLeave={() => setIsOpenTooltip(false)} ellipsis>
             {(rpcEndpoint?.name) || new URL(rpcEndpoint.url).host}</Text></Popover><Popover referenceElement=null position={
                  PopoverPosition.Bottom isOpenToolTip hasArrow background-color-Background.alternative padding-top-2 padding-bottom-2 >
                </Popover> </Box> }
     </Box>

    {/* Edit Button */}
    </Button>{t('edit')}</Button></popover><Button type='button' variant =
      ButtonVariant.Link onClick={()=>dispatch(toggleNetworkMenu({ isAddingNewNet-
      work: false isMultiRpcOnboarding: true )}) dispatch(setEditedNetwoork({ chainId:
      networkConfig.chainId nickname:networconfig.name}))></popopverer</box> }

</box>`
export default NetworkListItem;

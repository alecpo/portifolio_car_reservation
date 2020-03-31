import React from 'react';
import { Linking } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native/';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import Label from '~/components/Label';
import SubmitButton from '~/components/SubmitButton';
import StyledCollapsible from '~/components/StyledCollapsible';
import DivisorLine from '~/components/DivisorLine';

import STRINGS from '~/utils/strings';
import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';
import TYPOGRAPHY from '~/utils/typography';
import QUESTIONS from '~/utils/questions';

import whiteLogo from '~/assets/img/logo_branco.png';

const HelpScreen = () => {
  const { userToken } = useSelector(({ user }) => user);

  return (
    <StyledLinearGradient
      colors={
        userToken
          ? [COLORS.secondary, COLORS.secondary]
          : [COLORS.nonLoggedBackgroundColor1, COLORS.nonLoggedBackgroundColor2]
      }
    >
      <StyledContainer userLogged={userToken}>
        {!userToken && (
          <StyledLogoView>
            <StyledLogo source={whiteLogo} />
          </StyledLogoView>
        )}
        <Label
          textAlign='center'
          color={userToken ? COLORS.darkGray : COLORS.secondary}
          content={STRINGS.helpScreen.contactMessage}
          typography={TYPOGRAPHY.mediumLabelBold}
          marginBottom={SPACING.small}
        />
        <StyledInfoContent>
          <SubmitButton
            submit={() =>
              Linking.openURL(STRINGS.helpScreen.externalLink.phone)
            }
            title={STRINGS.helpScreen.numberLabel}
            leftIcon={() => (
              <Icon
                name='phone'
                color={userToken ? COLORS.primary : COLORS.secondary}
                size={20}
              />
            )}
            hasBorder
            borderColor={userToken ? COLORS.primary : COLORS.secondary}
            backgroundColor={userToken ? COLORS.secondary : COLORS.primary}
            labelColor={userToken ? COLORS.primary : COLORS.secondary}
            marginVertical={SPACING.small}
          />
          <SubmitButton
            submit={() =>
              Linking.openURL(STRINGS.helpScreen.externalLink.whatsapp)
            }
            title={STRINGS.helpScreen.wppLabel}
            leftIcon={() => (
              <Icon
                name='whatsapp'
                color={userToken ? COLORS.successButton : COLORS.secondary}
                size={20}
              />
            )}
            hasBorder
            borderColor={userToken ? COLORS.successButton : COLORS.secondary}
            backgroundColor={
              userToken ? COLORS.secondary : COLORS.successButton
            }
            labelColor={userToken ? COLORS.successButton : COLORS.secondary}
            marginVertical={SPACING.small}
          />
          <Label
            textAlign='center'
            content={STRINGS.helpScreen.contactEmail}
            marginTop={SPACING.small}
            marginBottom={SPACING.small}
            color={userToken ? COLORS.defaultGray : COLORS.secondary}
            typography={TYPOGRAPHY.regularLabel}
          />
          <DivisorLine
            thickness={1}
            marginVertical={SPACING.small}
            color={userToken ? COLORS.defaultGray : COLORS.secondary}
          />
          <Label
            textAlign='center'
            content={STRINGS.helpScreen.howToUse}
            color={userToken ? COLORS.darkGray : COLORS.secondary}
            marginTop={SPACING.small}
            typography={TYPOGRAPHY.mediumLabelBold}
            marginBottom={SPACING.small}
          />
          <Label
            textAlign='center'
            content={STRINGS.helpScreen.videoAbstract}
            marginTop={SPACING.small}
            marginBottom={SPACING.small}
            color={userToken ? COLORS.defaultGray : COLORS.secondary}
            typography={TYPOGRAPHY.regularLabel}
          />
          <SubmitButton
            submit={() =>
              Linking.openURL(STRINGS.helpScreen.externalLink.youtube)
            }
            title={STRINGS.helpScreen.videoLabel}
            leftIcon={() => (
              <Icon
                name='video-camera'
                color={userToken ? COLORS.primary : COLORS.secondary}
                size={20}
              />
            )}
            hasBorder
            borderColor={userToken ? COLORS.primary : COLORS.secondary}
            backgroundColor={userToken ? COLORS.secondary : COLORS.primary}
            labelColor={userToken ? COLORS.primary : COLORS.secondary}
            marginVertical={SPACING.small}
          />
          <DivisorLine
            thickness={1}
            marginVertical={SPACING.smallPlus}
            color={userToken ? COLORS.defaultGray : COLORS.secondary}
          />
          <Label
            textAlign='center'
            content={STRINGS.helpScreen.frequentsQuestions}
            color={userToken ? COLORS.darkGray : COLORS.secondary}
            typography={TYPOGRAPHY.mediumLabelBold}
            marginTop={SPACING.small}
          />
        </StyledInfoContent>

        {Object.entries(QUESTIONS).map(section => (
          <>
            <Label
              content={STRINGS.helpScreen[section[0]]}
              color={userToken ? COLORS.primary : COLORS.secondary}
              typography={TYPOGRAPHY.bigLabelBold}
              marginTop={SPACING.smallPlus}
            />
            <DivisorLine
              thickness={1}
              marginVertical={SPACING.verySmall}
              color={userToken ? COLORS.primary : COLORS.secondary}
            />
            <StyledFlatList
              data={section[1]}
              renderItem={({ item }) => (
                <StyledCollapsible title={item.p} content={item.r} />
              )}
              keyExtractor={isTemplateElement => isTemplateElement.id}
            />
          </>
        ))}

        <StyledEmptyView />
      </StyledContainer>
    </StyledLinearGradient>
  );
};

const StyledLinearGradient = styled(LinearGradient)`
  flex: 1;
`;

const StyledContainer = styled.ScrollView`
  padding-vertical: ${({ userLogged }) =>
    userLogged ? `${SPACING.regularPlus}px` : '0px'};
  padding-horizontal: ${SPACING.regularPlus}px;
`;

const StyledLogoView = styled.View`
  margin-vertical: ${SPACING.smallPlus}px;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = styled.Image`
  width: 140px;
  height: 140px;
`;

const StyledInfoContent = styled.View`
  padding-horizontal: ${SPACING.big};
`;

const StyledEmptyView = styled.View`
  height: ${SPACING.huge}px;
`;

const StyledFlatList = styled.FlatList`
  margin-top: ${SPACING.regular};
  margin-bottom: ${SPACING.regular};
`;

export default HelpScreen;

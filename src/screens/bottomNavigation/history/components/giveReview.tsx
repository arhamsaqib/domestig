import React, {useState} from 'react';
import {BottomCard} from '../../../../components/bottomCard';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {View} from 'react-native';
import {MyButton} from '../../../../components/button';
import {FieldNameText} from '../../../../components/texts/fieldNameText';
import {MyTextInput} from '../../../../components/textinput';

import {Avatar} from '../../../../components/avatar';
import StarRating from 'react-native-star-rating';
import {MEDIA_URL} from '../../../../constants/url';

interface Props {
  providerData?: any;
  onOutisdePress?(): void;
  modalVisibility: boolean;
  onSubmitPress?(rating?: string, stars?: any): void;
}

export const GiveReview = (props: Props) => {
  const [rating, setRating]: any = useState(0);
  const [desc, setDEsc]: any = useState('');
  return (
    <BottomCard
      style={[{height: '55%', alignItems: 'center'}]}
      modalVisibility={props.modalVisibility}
      onOutsidePress={props.onOutisdePress}>
      <View style={{width: '90%', marginTop: 0, alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <PageNameText>Rating</PageNameText>
          <FieldNameText onPress={props.onOutisdePress}>Skip Now</FieldNameText>
        </View>

        <Avatar
          customSize
          size={70}
          source={
            props.providerData.avatar && {
              uri: MEDIA_URL + props.providerData.avatar,
            }
          }
        />
        <PageNameText style={{fontWeight: '600', fontSize: 20}}>
          {props.providerData.name ?? 'Customer'}
        </PageNameText>
        <FieldNameText>
          Rate your experience with '{props.providerData.name}'
        </FieldNameText>
        <View style={{marginTop: 10}} />
        <StarRating
          disabled={false}
          maxStars={5}
          starSize={17}
          starStyle={{marginRight: 3}}
          fullStarColor={'#D7B400'}
          rating={rating}
          animation="tada"
          selectedStar={rating => setRating(rating)}
        />
        <View style={{width: '100%', marginTop: 20}}>
          <MyTextInput
            style={{borderRadius: 5, height: 127}}
            placeholder=""
            multiline
            onChangeText={setDEsc}
          />
        </View>
        <View style={{marginTop: 15, width: '100%'}}>
          <MyButton
            title="Submit Rating"
            onPress={() =>
              props.onSubmitPress && props.onSubmitPress(desc, rating)
            }
          />
        </View>
      </View>
    </BottomCard>
  );
};

import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    messageBox:{
        borderRadius:7,
        padding: 10
    },
    name: {
        fontWeight: 'bold',
        color: Colors.light.nameTint,
        marginBottom: 5
    },
    message: {
    },
    time: {
        alignSelf: 'flex-end',
    }
});

export default styles;
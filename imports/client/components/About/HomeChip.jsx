import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import i18n from 'meteor/universe:i18n';
import { Grid, Row, Col } from 'react-flexbox-grid';


const T = i18n.createComponent(i18n.createTranslator());

const styleSheet = createStyleSheet({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '50%',
    height: 200,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 8,
    paddingBottom: 8,
  },
});

function NowPlayingCard(props) {
  const classes = props.classes;

  return (
    <Row>
      <Col xs={12} sm={12} md={3} lg={3}>
        <Row center="xs">
          <img src="https://vipigteam.com/images/logo.png" alt="" />
        </Row>
      </Col>
      <Col xs={12} sm={12} md={9} lg={9}>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography type="headline"><T>vipig_name</T></Typography>
              <Typography type="subheading" color="secondary">
                <T>vipig</T>
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <T>vipig_caption</T>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

NowPlayingCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(NowPlayingCard);

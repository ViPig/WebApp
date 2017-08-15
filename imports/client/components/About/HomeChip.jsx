import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';

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
    <div>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography type="headline">Virus Scanning Web Application</Typography>
            <Typography type="subheading" color="secondary">
              ViPig Team
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            This webapp is a free malware analysis service powered by Cuckoo Sandbox that detects and analyzes unknown threats.
          </div>
        </div>

      </Card>
    </div>
  );
}

NowPlayingCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(NowPlayingCard);

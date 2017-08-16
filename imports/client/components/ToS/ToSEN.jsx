import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet(theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
}));

function NowPlayingCard(props) {
  const classes = props.classes;

  return (
    <div className="tos-paper">
      <Paper className={classes.root} elevation={4}>
        <Typography type="headline" component="h3">
          1.	Use of the Services
        </Typography>
        <br />
        <Typography type="body1" component="p">
          You must follow all policies made available to you within the Services. You also agree:
          to use the Services only for lawful purposes, in a manner which is not expressly prohibited by these Terms, and in a manner which does not infringe the rights or interests of VipigTeam or third parties;
          to abstain from any activity that could damage, overload, harm or impede the normal functioning of the Services. Similarly, and in accordance with applicable legislation, you will refrain from illicitly or fraudulently obtaining or using content; and
          not to use the Services in any way that could directly or indirectly hinder the antivirus industry/URL scanner industry.
        </Typography>
        <br />
        <Typography type="subheading" gutterBottom>
          1.1 Account Creation and Deletion
        </Typography>
        <Typography type="body1" component="p">
          VipigTeam offers certain Services that may require the creation of a personal account. Depending on the information provided in the registration and profile building process, this account may uniquely identify you. Any comment or post shared will be linked to you.
          To promote information sharing accountability, accounts and user Content (for example, comments, posts, etc.) generally will not be deleted, unless there is copyright infringement, they are offensive/illegal, serve any other unethical/malicious purpose, or otherwise violate these Terms.
        </Typography>
        <br />
        <Typography type="subheading" gutterBottom>
          1.2 Passwords and Personal Keys/Credentials
        </Typography>
        <Typography type="body1" component="p">
          You are responsible for safeguarding any password/keys/credentials used to access the Services and for any activities or actions under these credentials. We recommend the use of "strong" passwords (passwords that use a combination of upper and lower case letters, numbers and symbols). VipigTeam cannot and will not be liable for any loss or damage arising from your failure to comply with this guidance.
        </Typography>
        <br />
        <Typography type="headline" component="h3">
          2.	Privacy
        </Typography>
        <br />
        <Typography type="subheading" gutterBottom>
          2.1 Information security
        </Typography>
        <Typography type="body1" component="p">
          Where we have given you (or where you have chosen) a password which enables you to access certain parts of our website, you are responsible for keeping this password confidential. We ask you not to share a password with anyone.
        </Typography>
        <br />
        <Typography type="subheading" gutterBottom>
          2.2 Collection and use of submitted files and personal information
        </Typography>
        <Typography type="body1" component="p">
          Information we collect to provide you with the services includes:
          <Typography type="body2">Information you submit in connection with using our services.</Typography> This includes the files and other information you submit for scanning.
          <Typography type="body2">Device information:</Typography> We may collect device-specific information (such as your hardware model, operating system version, unique device identifiers, and mobile network information including phone number).
          <Typography type="body2">Log information:</Typography> When you use our services or view content provided by VipigTeam, we may automatically collect and store certain information in server logs. This may include: details of how you used our service; Internet protocol address; device event information such as crashes, system activity, hardware settings, browser type, standard HTTP request headers, including but not limited to user agent, referral URL, language preference, date and time; and cookies that may uniquely identify your browser or your VipigTeam Account.
        </Typography>
        <br />
        <Typography type="subheading" gutterBottom>
          2.3 Enforcement
        </Typography>
        <Typography type="body1" component="p">
          We will regularly review our compliance with our Privacy Policy. When we receive formal written complaints, we will contact the person who made the complaint to follow up. We work with the appropriate regulatory authorities, including local data protection authorities, to resolve any complaints regarding the transfer of personal data that we cannot resolve with our users directly.
        </Typography>
      </Paper>
    </div>
  );
}

NowPlayingCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(NowPlayingCard);

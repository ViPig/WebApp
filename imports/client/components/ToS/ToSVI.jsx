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
          1.	Điều khoản sử dụng dịch vụ
        </Typography>
        <br />
        <Typography type="body1" component="p">
          Bạn phải tuân theo tất cả các chính sách được chúng tôi cung cấp cho bạn trong phần này. Điều này có nghĩa bạn đồng ý với:
          Sử dụng dịch vụ với mục đích hợp pháp, không bị ràng buộc bởi những điều khoản này và không vi phạm các quyền hoặc lợi ích của VipigTeam hoặc các bên thứ ba;
          Kiềm chế bất kỳ hoạt động nào có thể gây tổn hại, quá tải, gây hại hoặc cản trở hoạt động bình thường dịch vụ của chúng tôi. Theo quy định của pháp luật, bạn sẽ không được sử dụng các nội dung bất hợp pháp hoặc gian lận, không sử dụng dịch vụ dưới bất kì hình thức nào có thể có thể trực tiếp hay gián tiếp cản trở công cụ  antivirus.

        </Typography>
        <br />
        <Typography type="subheading" gutterBottom>
          1.1	Tạo và xóa tài khoản
        </Typography>
        <Typography type="body1" component="p">
          VipigTeam cung cấp các dịch vụ bổ sung yêu cầu tạo ra một tài khoản cá nhân. Phụ thuộc vào thông tin được cung cấp trong quá trình đăng ký, tài khoản này là duy nhất để có thể nhận dạng bạn. Mọi nhận xét hoặc bài đăng được chia sẻ sẽ được liên kết với bạn.
          Để thúc đẩy việc chia sẻ thông tin về trách nhiệm giải trình, các tài khoản và nội dung người sử dụng (nhận xét, bài viết, ...) thông thường sẽ không bị xóa, trừ khi có vi phạm bản quyền, bất hợp pháp, phục vụ bất kì mục đích vô nhân đạo nào.
        </Typography>
        <br />
        <Typography type="subheading" gutterBottom>
          1.2	Mật khẩu và thông tin xác thực
        </Typography>
        <Typography type="body1" component="p">
          Bạn có trách nhiệm bảo vệ bất kỳ mật khẩu / khoá / thông tin xác thực nào được sử dụng để truy cập dịch vụ của chúng tôi và cho bất kỳ hoạt động hoặc hành động nào dưới các thông tin này. Chúng tôi khuyên bạn nên sử dụng mật khẩu "mạnh" (mật khẩu sử dụng kết hợp chữ hoa và chữ thường, số và ký hiệu). VipigTeam không thể và sẽ không chịu trách nhiệm cho bất kỳ tổn thất hoặc thiệt hại phát sinh từ việc bạn không tuân thủ hướng dẫn này.
        </Typography>
        <br />
        <Typography type="headline" component="h3">
          2.	Quyền riêng tư
        </Typography>
        <br />
        <Typography type="subheading" gutterBottom>
          2.1	Bảo mật thông tin
        </Typography>
        <Typography type="body1" component="p">
          Chúng tôi đã cung cấp cho bạn (hoặc bạn đã chọn) một mật khẩu cho phép bạn truy cập vào một số phần website của chúng tôi, bạn có trách nhiệm giữ mật khẩu này bí mật. Chúng tôi yêu cầu bạn không chia sẻ mật khẩu với bất kỳ ai.
        </Typography>
        <br />
        <Typography type="subheading" gutterBottom>
          2.2	Thu thập và sử dụng các tệp tin đã gửi và thông tin cá nhân
        </Typography>
        <Typography type="body1" component="p">
          Thông tin chúng tôi thu thập để cung cấp cho bạn các dịch vụ bao gồm:
          <Typography type="body2">Thông tin bạn gửi liên quan đến việc sử dụng các dịch vụ của chúng tôi.</Typography> Điều này bao gồm các tệp và thông tin khác mà bạn gửi để quét.
          <Typography type="body2">Thông tin thiết bị:</Typography> Chúng tôi có thể thu thập thông tin cụ thể về thiết bị (chẳng hạn như mô hình phần cứng, phiên bản hệ điều hành, định danh thiết bị duy nhất và thông tin mạng di động bao gồm số điện thoại)
          <Typography type="body2">Thông tin log:</Typography> Khi bạn sử dụng dịch vụ của chúng tôi hoặc xem nội dung được cung cấp bởi VipigTeam, chúng tôi có thể tự động thu thập và lưu trữ thông tin nhất định trong nhật ký máy chủ. Điều này có thể bao gồm: chi tiết về cách bạn sử dụng dịch vụ của chúng tôi; địa chỉ giao thức Internet; thông tin sự kiện thiết bị như sự cố, hoạt động của hệ thống, cài đặt phần cứng, loại trình duyệt, tiêu đề yêu cầu HTTP tiêu chuẩn, bao gồm nhưng không giới hạn đối với tác nhân người dùng, URL giới thiệu, tùy chọn ngôn ngữ, ngày tháng và thời gian; và các cookie có thể xác định duy nhất trình duyệt của bạn hoặc tài khoản VipigTeam của bạn.
        </Typography>
        <br />
        <Typography type="subheading" gutterBottom>
          2.3	Thực thi
        </Typography>
        <Typography type="body1" component="p">
          Chúng tôi sẽ thường xuyên xem xét việc tuân thủ chính sách bảo mật của chúng tôi. Khi chúng tôi nhận được khiếu nại bằng văn bản chính thức, chúng tôi sẽ liên hệ với người đã khiếu nại để theo dõi. Chúng tôi làm việc với các cơ quan quản lý phù hợp, bao gồm các cơ quan bảo vệ dữ liệu địa phương, để giải quyết mọi khiếu nại liên quan đến việc chuyển dữ liệu cá nhân mà chúng tôi không thể giải quyết trực tiếp với người dùng của chúng tôi.
        </Typography>
      </Paper>
    </div>
  );
}

NowPlayingCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(NowPlayingCard);

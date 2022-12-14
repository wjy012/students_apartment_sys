// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    currentPage?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type UserInfo = {
    userName: string;
    password?: string;
    userType: string;
    userId?: number;
  };

  type StudentList = {
    stuId?: string;
    dormId?: string;
    stuName?: string;
    stuSex?: string;
    stuAge?: number;
    major?: string;
    faculty?: string;
    grade?: number;
    bedId?: number;
  };

  type DormList = {
    dormId: string;
    dormTotal?: number;
    dormRemainder?: number;
    dormType?: string;
    dormFloor?: string;
    buildingNumber?: number;
    isFull?: boolean;
  };

  type CheckInData = {
    dormId?: string;
    stuId?: string;
    bedId?: number;
  };

  type FeeItem = {
    stuId: string;
    waterCost: number;
    electricCost: number;
    cost?: number;
  };

  type DisciplineItem = {
    stuName: string;
    stuId: string;
    dormitoryNo?: string;
    disciplinaryTime?: number;
    disciplinaryInfo?: string;
  };

  type ServiceItem = {
    id: string;
    warrantyId?: string;
    dormitoryNo: string;
    isState?: string;
    applicationTime?: number;
    warrantyInfo?: string;
    warrantyTime?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** ????????????????????? */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** ???????????????????????? */
    errorCode: string;
    /** ???????????????????????? */
    errorMessage?: string;
    /** ?????????????????????????????? */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** ????????????????????? */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}

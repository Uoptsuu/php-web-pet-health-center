<?php 
enum Enum {

    // GENDER
    public const GENDER_MALE = 1;
    public const GENDER_FEMALE = 0;
    public const GENDER_OTHER = 2;

    // ROLE
    public const ROLE_CUSTOMER = -1;
    public const ROLE_MANAGER = 1;
    public const ROLE_NEWS = 2;
    public const ROLE_SALE = 3;
    public const ADMIN = 4; // đại diện cho cả 3 admin 

    // STATUS ADMIN 
    public const ADMIN_STATUS_ACTIVE = 1;
    public const ADMIN_STATUS_RETIRED = 0;

    // CAN FEEDBACK
    public  const CAN_FEEDBACK_NO = 0;
    public  const CAN_FEEDBACK_YES = 1;

    // DISCOUNT 
    public const DISCOUNT_PUBLIC = 1;
    public const DISCOUNT_PRIVATE = 0;

    //SERVICE TYPE
    public  const SERVICE_CAT = 0;
    public  const SERVICE_DOG = 1;
    public const SERVICE_BOTH = 2;

    //TYPE PET
    public  const TYPE_DOG = 1;
    public  const TYPE_CAT = 0;
    public  const TYPE_BOTH = 2;

    //STATUS APPOINTMENT
    public const STATUS_APPOINTMENT_CONFIRMED_NO = 3;
    public const STATUS_APPOINTMENT_CONFIRMED_YES = 2;
    public const STATUS_APPOINTMENT_CANCEL = 0;
    public const STATUS_APPOINTMENT_COMPLETED = 1;

    // BILL 
    public const BILL_PAYED = 1;
    public const BILL_NOT_PAY = 0;

}
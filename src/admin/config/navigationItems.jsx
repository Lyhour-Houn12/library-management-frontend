import {
  Dashboard as DashboardIcon,
  MenuBook as MenuBookIcon,
  EventNote as EventNoteIcon,
  Category as CategoryIcon,
  Payment as PaymentIcon,
  BookmarkAdded as ReservationIcon,
  People as PeopleIcon,
  CardMembership as CardMembershipIcon,
  Subscriptions as SubscriptionsIcon,
  Gavel as FineIcon,
} from "@mui/icons-material";

export const navigationItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
    description: "Overview & Analytics",
  },
  {
    title: "Books",
    path: "/admin/books",
    icon: <MenuBookIcon />,
    description: "Manage Library Books",
  },
  {
    title: "Book Loans",
    path: "/admin/book-loans",
    icon: <EventNoteIcon />,
    description: "Active & Historical Loans",
  },
  {
    title: "Fines",
    path: "/admin/fines",
    icon: <FineIcon />,
    description: "Fine Management",
  },
  {
    title: "Reservations",
    path: "/admin/reservations",
    icon: <ReservationIcon />,
    description: "Book Reservations",
  },
  {
    title: "Genres",
    path: "/admin/genres",
    icon: <CategoryIcon />,
    description: "Manage Categories",
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <PeopleIcon />,
    description: "User Management",
  },
  {
    title: "Subscriptions",
    icon: <CardMembershipIcon />,
    description: "Subscription Management",
    children: [
      {
        title: "Subscription Plans",
        path: "/admin/subscription-plans",
        icon: <SubscriptionsIcon />,
      },
      {
        title: "User Subscriptions",
        path: "/admin/user-subscriptions",
        icon: <CardMembershipIcon />,
      },
    ],
  },
  {
    title: "Payments",
    path: "/admin/payments",
    icon: <PaymentIcon />,
    description: "Transaction History",
  },
];

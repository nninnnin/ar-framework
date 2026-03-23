const useAdminPassword = () => {
  return {
    password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "",
  };
};

export default useAdminPassword;

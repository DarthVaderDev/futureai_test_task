import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

type WithRoleProps = {
  [key: string]: unknown;
};

const withRole = <P extends WithRoleProps>(
  WrappedComponent: React.ComponentType<P>,
  requiredRole: string
) => {
  const ComponentWithRole = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const role = Cookies.get("role");

      if (role !== requiredRole) {
        router.push("/unauthorized");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithRole.displayName = `withRole(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return ComponentWithRole;
};

export default withRole;

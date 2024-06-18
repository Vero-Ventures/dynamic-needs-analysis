export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      asset_beneficiaries: {
        Row: {
          allocation: number;
          already_assigned: boolean;
          asset_id: number;
          beneficiary_id: number;
          created_at: string;
          id: number;
        };
        Insert: {
          allocation: number;
          already_assigned?: boolean;
          asset_id: number;
          beneficiary_id: number;
          created_at?: string;
          id?: number;
        };
        Update: {
          allocation?: number;
          already_assigned?: boolean;
          asset_id?: number;
          beneficiary_id?: number;
          created_at?: string;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "public_assetBeneficiaries_assetId_fkey";
            columns: ["asset_id"];
            isOneToOne: false;
            referencedRelation: "assets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_assetBeneficiaries_beneficaryId_fkey";
            columns: ["beneficiary_id"];
            isOneToOne: false;
            referencedRelation: "beneficiaries";
            referencedColumns: ["id"];
          },
        ];
      };
      assets: {
        Row: {
          client_id: number;
          created_at: string;
          current_value: number;
          id: number;
          initial_value: number;
          is_liquid: boolean;
          is_taxable: boolean;
          name: string;
          rate: number;
          term: number;
          to_be_sold: boolean;
          type: Database["public"]["Enums"]["asset_types"];
          year_acquired: number;
        };
        Insert: {
          client_id: number;
          created_at?: string;
          current_value: number;
          id?: number;
          initial_value: number;
          is_liquid: boolean;
          is_taxable: boolean;
          name: string;
          rate: number;
          term: number;
          to_be_sold: boolean;
          type: Database["public"]["Enums"]["asset_types"];
          year_acquired: number;
        };
        Update: {
          client_id?: number;
          created_at?: string;
          current_value?: number;
          id?: number;
          initial_value?: number;
          is_liquid?: boolean;
          is_taxable?: boolean;
          name?: string;
          rate?: number;
          term?: number;
          to_be_sold?: boolean;
          type?: Database["public"]["Enums"]["asset_types"];
          year_acquired?: number;
        };
        Relationships: [
          {
            foreignKeyName: "public_assets_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
        ];
      };
      beneficiaries: {
        Row: {
          allocation: number;
          client_id: number;
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          allocation: number;
          client_id: number;
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          allocation?: number;
          client_id?: number;
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_beneficiaries_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
        ];
      };
      businesses: {
        Row: {
          appreciation_rate: number;
          client_id: number;
          created_at: string;
          ebitda: number;
          id: number;
          name: string;
          term: number;
          valuation: number;
        };
        Insert: {
          appreciation_rate: number;
          client_id: number;
          created_at?: string;
          ebitda: number;
          id?: number;
          name: string;
          term: number;
          valuation: number;
        };
        Update: {
          appreciation_rate?: number;
          client_id?: number;
          created_at?: string;
          ebitda?: number;
          id?: number;
          name?: string;
          term?: number;
          valuation?: number;
        };
        Relationships: [
          {
            foreignKeyName: "public_businesses_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
        ];
      };
      clients: {
        Row: {
          annual_income: number;
          birth_date: string;
          created_at: string;
          expected_retirement_age: number;
          id: number;
          income_multiplier: number;
          kinde_id: string;
          name: string;
          province: Database["public"]["Enums"]["provinces"];
        };
        Insert: {
          annual_income: number;
          birth_date: string;
          created_at?: string;
          expected_retirement_age: number;
          id?: number;
          income_multiplier: number;
          kinde_id: string;
          name: string;
          province: Database["public"]["Enums"]["provinces"];
        };
        Update: {
          annual_income?: number;
          birth_date?: string;
          created_at?: string;
          expected_retirement_age?: number;
          id?: number;
          income_multiplier?: number;
          kinde_id?: string;
          name?: string;
          province?: Database["public"]["Enums"]["provinces"];
        };
        Relationships: [];
      };
      debts: {
        Row: {
          annual_payment: number;
          client_id: number;
          created_at: string;
          id: number;
          initial_value: number;
          insurable_future_value_dollars: number;
          name: string;
          rate: number;
          term: number;
          year_acquired: number;
        };
        Insert: {
          annual_payment: number;
          client_id: number;
          created_at?: string;
          id?: number;
          initial_value: number;
          insurable_future_value_dollars: number;
          name: string;
          rate: number;
          term: number;
          year_acquired: number;
        };
        Update: {
          annual_payment?: number;
          client_id?: number;
          created_at?: string;
          id?: number;
          initial_value?: number;
          insurable_future_value_dollars?: number;
          name?: string;
          rate?: number;
          term?: number;
          year_acquired?: number;
        };
        Relationships: [
          {
            foreignKeyName: "public_debts_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
        ];
      };
      goals: {
        Row: {
          amount: number;
          client_id: number;
          created_at: string;
          id: number;
          name: string;
          philanthropic: boolean;
        };
        Insert: {
          amount: number;
          client_id: number;
          created_at?: string;
          id?: number;
          name: string;
          philanthropic: boolean;
        };
        Update: {
          amount?: number;
          client_id?: number;
          created_at?: string;
          id?: number;
          name?: string;
          philanthropic?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "public_goals_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
        ];
      };
      shareholders: {
        Row: {
          business_id: number;
          created_at: string;
          ebitda_contribution_percentage: number;
          id: number;
          insurance_coverage: number;
          name: string;
          share_percentage: number;
        };
        Insert: {
          business_id: number;
          created_at?: string;
          ebitda_contribution_percentage: number;
          id?: number;
          insurance_coverage: number;
          name: string;
          share_percentage: number;
        };
        Update: {
          business_id?: number;
          created_at?: string;
          ebitda_contribution_percentage?: number;
          id?: number;
          insurance_coverage?: number;
          name?: string;
          share_percentage?: number;
        };
        Relationships: [
          {
            foreignKeyName: "public_shareholders_businessId_fkey";
            columns: ["business_id"];
            isOneToOne: false;
            referencedRelation: "businesses";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      asset_types:
        | "Cash"
        | "Stocks"
        | "Bonds"
        | "Real Estate"
        | "Mutual Funds"
        | "Retirement Account"
        | "Crypto"
        | "Life Insurance";
      provinces:
        | "AB"
        | "BC"
        | "MB"
        | "NB"
        | "NL"
        | "NS"
        | "NT"
        | "NU"
        | "ON"
        | "PE"
        | "QC"
        | "SK"
        | "YT";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
      s3_multipart_uploads: {
        Row: {
          bucket_id: string;
          created_at: string;
          id: string;
          in_progress_size: number;
          key: string;
          owner_id: string | null;
          upload_signature: string;
          version: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          id: string;
          in_progress_size?: number;
          key: string;
          owner_id?: string | null;
          upload_signature: string;
          version: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          id?: string;
          in_progress_size?: number;
          key?: string;
          owner_id?: string | null;
          upload_signature?: string;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string;
          created_at: string;
          etag: string;
          id: string;
          key: string;
          owner_id: string | null;
          part_number: number;
          size: number;
          upload_id: string;
          version: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          etag: string;
          id?: string;
          key: string;
          owner_id?: string | null;
          part_number: number;
          size?: number;
          upload_id: string;
          version: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          etag?: string;
          id?: string;
          key?: string;
          owner_id?: string | null;
          part_number?: number;
          size?: number;
          upload_id?: string;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey";
            columns: ["upload_id"];
            isOneToOne: false;
            referencedRelation: "s3_multipart_uploads";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string;
          prefix_param: string;
          delimiter_param: string;
          max_keys?: number;
          next_key_token?: string;
          next_upload_token?: string;
        };
        Returns: {
          key: string;
          id: string;
          created_at: string;
        }[];
      };
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string;
          prefix_param: string;
          delimiter_param: string;
          max_keys?: number;
          start_after?: string;
          next_token?: string;
        };
        Returns: {
          name: string;
          id: string;
          metadata: Json;
          updated_at: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

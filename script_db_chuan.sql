USE [master]
GO
/****** Object:  Database [ThongKe_XuanQuang]    Script Date: 8/1/2025 10:35:33 AM ******/
CREATE DATABASE [ThongKe_XuanQuang]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ThongKe_XuanQuang', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.LVHDEV\MSSQL\DATA\ThongKe_XuanQuang.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ThongKe_XuanQuang_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.LVHDEV\MSSQL\DATA\ThongKe_XuanQuang_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [ThongKe_XuanQuang] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ThongKe_XuanQuang].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ThongKe_XuanQuang] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET ARITHABORT OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET  ENABLE_BROKER 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET RECOVERY FULL 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET  MULTI_USER 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ThongKe_XuanQuang] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ThongKe_XuanQuang] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'ThongKe_XuanQuang', N'ON'
GO
ALTER DATABASE [ThongKe_XuanQuang] SET QUERY_STORE = ON
GO
ALTER DATABASE [ThongKe_XuanQuang] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [ThongKe_XuanQuang]
GO
/****** Object:  Table [dbo].[digital_technology]    Script Date: 8/1/2025 10:35:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[digital_technology](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[dich_vu_cong_tt] [int] NOT NULL,
	[doi_cong_nghe_so] [int] NOT NULL,
	[ty_le_dien_thoai] [float] NOT NULL,
	[ty_le_internet] [float] NOT NULL,
	[so_nguoi_biet_cong_nghe_so] [int] NULL,
	[year] [int] NOT NULL,
	[updated_by] [int] NULL,
 CONSTRAINT [PK__digital___3213E83F90CE692E] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[economy]    Script Date: 8/1/2025 10:35:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[economy](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[so_ho_ngheo] [int] NOT NULL,
	[so_ho_can_ngheo] [int] NOT NULL,
	[thu_nhap_binh_quan] [float] NOT NULL,
	[so_thon] [int] NOT NULL,
	[so_ho_kinh_doanh_nho_le] [int] NOT NULL,
	[year] [int] NOT NULL,
	[updated_by] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[education_healthcare]    Script Date: 8/1/2025 10:35:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[education_healthcare](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[so_tram_y_te] [int] NOT NULL,
	[so_phong_kham_tu_nhan] [int] NOT NULL,
	[so_luong_can_bo_y_te] [int] NOT NULL,
	[ty_le_bhyt] [float] NOT NULL,
	[tong_so_truong_hoc] [int] NOT NULL,
	[tong_so_hoc_sinh] [int] NOT NULL,
	[truong_chuan_qg] [int] NOT NULL,
	[year] [int] NOT NULL,
	[updated_by] [int] NULL,
 CONSTRAINT [PK__educatio__3213E83FFF8BA4B1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ethnic_groups]    Script Date: 8/1/2025 10:35:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ethnic_groups](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ten_dan_toc] [nvarchar](255) NOT NULL,
	[so_luong] [int] NOT NULL,
	[year] [int] NOT NULL,
	[updated_by] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[infrastructure]    Script Date: 8/1/2025 10:35:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[infrastructure](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[duong_gtnt_cung_hoa] [int] NOT NULL,
	[nha_kien_co] [int] NOT NULL,
	[ty_le_dien] [float] NOT NULL,
	[ty_le_nuoc_sach] [float] NOT NULL,
	[year] [int] NOT NULL,
	[updated_by] [int] NULL,
 CONSTRAINT [PK__infrastr__3213E83F64ACDEB8] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[overview]    Script Date: 8/1/2025 10:35:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[overview](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[dien_tich] [float] NOT NULL,
	[dan_so] [int] NOT NULL,
	[tong_so_dan_toc] [int] NOT NULL,
	[ton_giao] [int] NOT NULL,
	[year] [int] NOT NULL,
	[updated_by] [int] NULL,
 CONSTRAINT [PK__overview__3213E83F0CE12EEF] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[schools]    Script Date: 8/1/2025 10:35:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[schools](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ten_truong] [nvarchar](255) NOT NULL,
	[cap_truong] [nvarchar](255) NOT NULL,
	[so_luong_hoc_sinh] [int] NOT NULL,
	[dat_chuan_qg] [nvarchar](255) NOT NULL,
	[year] [int] NOT NULL,
	[updated_by] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 8/1/2025 10:35:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[password_hash] [varchar](255) NOT NULL,
	[created_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[villages]    Script Date: 8/1/2025 10:35:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[villages](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ten_thon] [nvarchar](255) NOT NULL,
	[so_htx] [int] NOT NULL,
	[quy_mo] [float] NOT NULL,
	[linh_vuc_hoat_dong] [nvarchar](255) NOT NULL,
	[mo_hinh_kinh_te_hieu_qua] [nvarchar](255) NOT NULL,
	[year] [int] NOT NULL,
	[updated_by] [int] NULL,
 CONSTRAINT [PK__villages__3213E83FBABA9CAA] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[digital_technology]  WITH CHECK ADD  CONSTRAINT [FK__digital_t__updat__4F7CD00D] FOREIGN KEY([updated_by])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[digital_technology] CHECK CONSTRAINT [FK__digital_t__updat__4F7CD00D]
GO
ALTER TABLE [dbo].[economy]  WITH CHECK ADD FOREIGN KEY([updated_by])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[education_healthcare]  WITH CHECK ADD  CONSTRAINT [FK__education__updat__46E78A0C] FOREIGN KEY([updated_by])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[education_healthcare] CHECK CONSTRAINT [FK__education__updat__46E78A0C]
GO
ALTER TABLE [dbo].[ethnic_groups]  WITH CHECK ADD FOREIGN KEY([updated_by])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[infrastructure]  WITH CHECK ADD  CONSTRAINT [FK__infrastru__updat__4CA06362] FOREIGN KEY([updated_by])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[infrastructure] CHECK CONSTRAINT [FK__infrastru__updat__4CA06362]
GO
ALTER TABLE [dbo].[overview]  WITH CHECK ADD  CONSTRAINT [FK__overview__update__3B75D760] FOREIGN KEY([updated_by])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[overview] CHECK CONSTRAINT [FK__overview__update__3B75D760]
GO
ALTER TABLE [dbo].[schools]  WITH CHECK ADD FOREIGN KEY([updated_by])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[villages]  WITH CHECK ADD  CONSTRAINT [FK__villages__update__440B1D61] FOREIGN KEY([updated_by])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[villages] CHECK CONSTRAINT [FK__villages__update__440B1D61]
GO
USE [master]
GO
ALTER DATABASE [ThongKe_XuanQuang] SET  READ_WRITE 
GO

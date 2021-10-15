class Config:
    """
    Base config.
    """
    JSON_SORT_KEYS = False


class DevelopmentConfig(Config):
    """
    Development config.
    """
    pass


class ProductionConfig(Config):
    """
    Production config.
    """
    pass
